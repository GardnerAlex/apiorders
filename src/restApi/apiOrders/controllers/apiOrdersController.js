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
const apiMethods_1 = require("../../apiMethods");
const apiRequestProcessor_1 = require("../apiRequestProcessor");
const utils = require('../../../utils');
const restOrdersBaseUrl = '/orders';
const healthCheckRestOrdersUrl = utils.getEnv('HEALTHCHECK_REST_ORDERS_URL');
exports.placeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const apiMethodGroup = 'apiOrders';
    const apiMethod = 'placeOrder';
    const apiMethodName = apiMethods_1.apiMethods[apiMethodGroup][apiMethod].request;
    yield apiRequestProcessor_1.processApiRequest(req, res, next, apiMethodGroup, apiMethodName);
});
exports.isOk = (req, res, next) => res.status(200).send();
exports.routes = [
    { method: 'post',
        endPoint: `${restOrdersBaseUrl}/placeorder`,
        controller: exports.placeOrder
    },
    { method: 'get',
        endPoint: healthCheckRestOrdersUrl,
        controller: exports.isOk
    }
];
//# sourceMappingURL=apiOrdersController.js.map