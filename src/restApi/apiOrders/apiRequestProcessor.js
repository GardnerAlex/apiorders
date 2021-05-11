"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformData_1 = require("./helpers/transformData");
const sendMail_1 = require("./helpers/sendMail");
const utils = require('../../utils.js');
// var util = require('util');
const dbService = require('../../db/dbConnectors/restOrders/restOrdersDbConnector');
function getOrCreateUser(fixedRawBody) {
    return __awaiter(this, void 0, void 0, function* () {
        let userInDb = yield dbService.getOrdersUserByPhone(fixedRawBody.phone);
        if (userInDb.result.length === 0) {
            userInDb = yield dbService.createOrdersNewUser(fixedRawBody);
        }
        return userInDb;
    });
}
function createOrderInDb(fixedRawBody, userId, orderStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        const date = new Date();
        const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        const orderInputData = Object.assign(Object.assign({}, fixedRawBody), { orders_user_id: userId, created_at: isoDateTime, status: orderStatus });
        return dbService.placeOrder(orderInputData);
    });
}
function sendToOperatorAndReplyToCustomer(fixedRawBody, orderId, response, nextStep) {
    return __awaiter(this, void 0, void 0, function* () {
        const respMessage = {
            success: true,
            error: { code: 0, message: '' }
        };
        const sendMailResult = yield sendMail_1.sendMail(Object.assign(Object.assign({}, fixedRawBody), { orderId })); // енсли sendResult = { success: false, error: e };
        // ставим статус ордеру что все ок
        console.log('sendMailResult', sendMailResult);
        if (sendMailResult.success) {
            yield dbService.updateOrderStatus(2, orderId);
            respMessage.error.message = `Заказ ${orderId} принят в обработку оператором`;
        }
        else {
            yield dbService.updateOrderStatus(3, orderId); // ошибка отправки оператору
            respMessage.success = false;
            respMessage.error.code = 1;
            respMessage.error.message = `Заказ ${orderId} не удалось обработать. Нет связи с оператором`;
        }
        response.status(200).send(respMessage);
        nextStep();
    });
}
function processApiRequest(request, response, nextStep, apiMethodName, apiMethodGroup) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const rawBody = request.body.toString('utf8');
            // console.log('+++', request.rawBody.toString());
            const fixedRawBody = transformData_1.transformData(request.rawBody.toString());
            console.log('fixedrawBody', fixedRawBody);
            const params = {
                status: 0,
                reqData: {
                    id: request.id,
                    authorization: request.headers.authorization,
                    apiMethodName: request.method,
                    reqBody: Object.assign({}, fixedRawBody),
                    reqParams: Object.assign({}, request.params),
                    reqQuery: Object.assign({}, request.query)
                },
            };
            console.log('params', params);
            if (utils.getEnv(apiMethodGroup) !== 'enabled') {
                // query db, send resp with order id
                response.status(403).send();
                nextStep();
            }
            // получить юзера, создать ордер в статусе 1 - создан, отправить письмо,
            const orderUserId = yield getOrCreateUser(fixedRawBody);
            console.log('userInDb', orderUserId);
            const orderId = yield createOrderInDb(fixedRawBody, orderUserId.result[0].id, 1);
            console.log('createOrderInDb', createOrderInDb);
            // если отправилось - статус 2 - получен оператором
            yield sendToOperatorAndReplyToCustomer(fixedRawBody, orderId.result[0].order_id, response, nextStep);
        }
        catch (err) {
            nextStep(err);
        }
    });
}
exports.processApiRequest = processApiRequest;
//# sourceMappingURL=apiRequestProcessor.js.map