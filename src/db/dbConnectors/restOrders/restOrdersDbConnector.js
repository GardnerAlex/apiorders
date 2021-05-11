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
const dbConnector_1 = require("../../dbConnector");
function placeOrder(i) {
    return __awaiter(this, void 0, void 0, function* () {
        // returning order_id
        console.log('placeOrder input', i);
        const queryText = `insert into apiorders.orders(orders_user_id, purchase_name, city, street, building, flat, deliverydate, created_at, status)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id AS order_id`;
        return dbConnector_1.queryDb(queryText, [i.orders_user_id, i.purchaseName, i.city, i.street, i.building, i.flat, i.deliveryDate, i.created_at, i.status]);
    });
}
exports.placeOrder = placeOrder;
function getOrdersUserByPhone(phone) {
    return __awaiter(this, void 0, void 0, function* () {
        //
        console.log('getOrdersUserByPhone', 'phone; ', phone);
        const queryText = 'select id from apiorders.customers where phone = $1';
        return dbConnector_1.queryDb(queryText, [phone]);
    });
}
exports.getOrdersUserByPhone = getOrdersUserByPhone;
function createOrdersNewUser(i) {
    return __awaiter(this, void 0, void 0, function* () {
        //
        const queryText = `insert into apiorders.customers(phone, email, name, surname, lastname)
  VALUES($1, $2, $3, $4, $5) RETURNING id`;
        return dbConnector_1.queryDb(queryText, [i.phone, i.email, i.name, i.surName, i.lastName]);
    });
}
exports.createOrdersNewUser = createOrdersNewUser;
function updateOrderStatus(status, order_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryText = 'UPDATE apiorders.orders SET status = $1 WHERE id = $2';
        return dbConnector_1.queryDb(queryText, [status, order_id]);
    });
}
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=restOrdersDbConnector.js.map