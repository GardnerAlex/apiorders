import { ApiRequest, PlaceOrderInterface, RestOrderInterface } from './apiOrdersInterfaces';
import { ApiOrdersDbInterface } from './dbServiceApiOrders/dbOrdersInterfaces';
import { transformData } from './helpers/transformData';
import { sendMail } from './helpers/sendMail';

const utils = require('./utils');
// var util = require('util');

const dbService: ApiOrdersDbInterface = require('./dbServiceApiOrders/dbConnectors/restOrders/ordersDbMethods');

async function getOrCreateUser(fixedRawBody: RestOrderInterface) {
  let userInDb = await dbService.getOrdersUserByPhone(fixedRawBody.phone);
  if (userInDb.result.length === 0) {
    userInDb = await dbService.createOrdersNewUser(fixedRawBody);
  }
  return userInDb;
}

async function createOrderInDb(fixedRawBody: RestOrderInterface, userId: number, orderStatus: number) {
  const date = new Date();
  const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  const orderInputData: PlaceOrderInterface = {
    ...fixedRawBody,
    orders_user_id: userId,
    created_at: isoDateTime,
    status: orderStatus
  };
  return dbService.placeOrder(orderInputData);
}

async function sendToOperatorAndReplyToCustomer(fixedRawBody: RestOrderInterface, orderId: number, response, nextStep) {
  const respMessage = {
    success: true,
    error: { code: 0, message: '' }
  };
  const sendMailResult = await sendMail({ ...fixedRawBody, orderId }); // енсли sendResult = { success: false, error: e };
  // ставим статус ордеру что все ок
  console.log('sendMailResult', sendMailResult);
  if (sendMailResult.success) {
    await dbService.updateOrderStatus(2, orderId);
    respMessage.error.message = `Заказ ${orderId} принят в обработку оператором`;
  } else {
    await dbService.updateOrderStatus(3, orderId); // ошибка отправки оператору
    respMessage.success = false;
    respMessage.error.code = 1;
    respMessage.error.message = `Заказ ${orderId} не удалось обработать. Нет связи с оператором`;
  }
  response.status(200).send(respMessage);
  nextStep();
}

// eslint-disable-next-line consistent-return
export async function processApiRequest(request, response, nextStep, apiMethodGroup, apiMethodName): Promise<void> {
  try {
    // const rawBody = request.body.toString('utf8');
    console.log('request.headers.authorization1112', request.headers.authorization);
    if (request.headers.authorization.indexOf('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjlkOWQyN2Vl') === -1) {
      // nextStep();
      return null;
    }
    const fixedRawBody: RestOrderInterface = transformData(request.rawBody.toString());
    console.log('fixedrawBody', fixedRawBody);
    const params: ApiRequest = {
      status: 0,
      reqData: {
        id: request.id,
        authorization: request.headers.authorization,
        apiMethodName: request.method,
        reqBody: { ...fixedRawBody },
        reqParams: { ...request.params },
        reqQuery: { ...request.query }
      },
    };
    console.log('params', params);
    if (utils.getEnv(apiMethodName) !== 'enabled') {
      // query db, send resp with order id
      response.status(403).send();
      nextStep();
    }
    // получить юзера, создать ордер в статусе 1 - создан, отправить письмо,
    const orderUserId = await getOrCreateUser(fixedRawBody);
    console.log('userInDb', orderUserId);
    const orderId = await createOrderInDb(fixedRawBody, orderUserId.result[0].id, 1);
    console.log('createOrderInDb', createOrderInDb);
    // если отправилось - статус 2 - получен оператором
    await sendToOperatorAndReplyToCustomer(fixedRawBody, orderId.result[0].order_id, response, nextStep);
    nextStep();
  } catch (err) {
    nextStep(err);
  }
}
