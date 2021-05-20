import { ApiOperatorDbInterface, GetOrdersInterfaceDbRes } from './dbServiceApiOperator/dbOperatorInterfaces';
import { apiOperatorMethods } from './apiOperatorMethods';
import {
  MarkOrderProcessed,
  OpenOrdersResponse,
  OpenOrdersResponseContainer,
  OrderDetailsResponseContainer,
  SetTokenRequest
} from './apiOperatorInterfaces';

const utils = require('./utils');
// var util = require('util');

const dbService: ApiOperatorDbInterface = require('./dbServiceApiOperator/dbConnectors/restOperator/operatorDbMethods');

function formatOrderItem(i): OpenOrdersResponse {
  return {
    orderId: i.order_id,
    purchaseName: i.purchase_name,
    createdAt: i.created_at,
    deliveryDate: i.deliverydate,
    orderStatus: i.order_status,
    customerComment: i.cust_comment,
    operatorComment: i.operator_comment,
    deliveryAddress: {
      city: i.city,
      street: i.street,
      building: i.building,
      flat: i.flat
    },
    customer: {
      phone: i.phone,
      email: i.email,
      name: i.name,
      surname: i.surname,
      lastname: i.lastname,
    }
  };
}

function formatOpenOrdersResponse(input: GetOrdersInterfaceDbRes []): OpenOrdersResponse[] {
  return input.map((i): OpenOrdersResponse => (
    formatOrderItem(i)
  ));
}

async function getOrdersToProcessHandler(request: any, response: any, nextStep: Function) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  console.log('request.headers.getOrdersToProcessHandler', request.headers.authorization);
  // получить открытые необработанные заказы из БД,
  const openOrders = await dbService.getOpenOrders();
  console.log('openOrders', openOrders);
  const resToSend: OpenOrdersResponseContainer = {
    result: formatOpenOrdersResponse(openOrders.result),
    error: openOrders.error
  };
  response.status(200).send(resToSend);
}

async function markOrderProcessedHandler(request: any, response: any, nextStep: Function) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // console.log('request.headers.markOrderProcessedHandler', request.headers.authorization);
  const requestBody: MarkOrderProcessed = request.body;
  console.log('requestBody.markOrderProcessedHandler', requestBody);
  // получить открытые необработанные заказы из БД,
  const markOrderProcessedResult = await dbService.updateOrderStatus(4, requestBody.order_id);
  console.log('markOrderProcessedError container', markOrderProcessedResult.error);
  response.status(200).send(markOrderProcessedResult.error);
}

async function getOrderDetails(request: any, response: any, nextStep: Function) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // console.log('request.headers.getOrderDetails', request);
  console.log('request.headers.getOrderDetails', request.query);
  const getOrderDetailsResultFromDb = await dbService.getOrderDetails(Number.parseFloat(request.query.order_id));
  console.log('getOrderDetailsResultFromDb', getOrderDetailsResultFromDb)
  const resToSend: OrderDetailsResponseContainer = {
    result: formatOrderItem(getOrderDetailsResultFromDb.result[0]),
    error: getOrderDetailsResultFromDb.error
  };
  console.log('getOrderDetails resToSend', resToSend);
  response.status(200).send(resToSend);
}

async function setTokenForOperator(request: any, response: any, nextStep: Function) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  console.log('request.params.setTokenForOperator', request.headers.authorization);
  const requestBody: SetTokenRequest = request.body;
  console.log('requestBody.markOrderProcessedHandler', requestBody);
  // получить открытые необработанные заказы из БД,
  let setTokenForOperator = {};
  setTokenForOperator = await dbService.setTokenForOperator(requestBody.login, requestBody.password);
  console.log('markOrderProcessedError container', setTokenForOperator.error);
  if (setTokenForOperator.error !== undefined && setTokenForOperator.result.length === 0) {
    setTokenForOperator.error.code = 1;
    setTokenForOperator.error.description = 'Неправильное имя пользователя или пароль';
  }
  response.status(200).send(setTokenForOperator);
  //
  nextStep();
}

const selectHandler = {
  [apiOperatorMethods.apiOperator.getOpenOrders.request]: getOrdersToProcessHandler,
  [apiOperatorMethods.apiOperator.markOrderProcessed.request]: markOrderProcessedHandler,
  [apiOperatorMethods.apiOperator.setToken.request]: setTokenForOperator,
  [apiOperatorMethods.apiOperator.getOrderDetails.request]: getOrderDetails
};

// eslint-disable-next-line @typescript-eslint/require-await
export async function processApiRequest(request, response, nextStep, apiMethodGroup, apiMethodName): Promise<void> {
  try {
    if (apiMethodName === apiOperatorMethods.apiOperator.setToken.request) { // не проверяем заголовок на авторизацию - так как тут авторизуемся
      console.log(apiMethodName);
      console.log(selectHandler[apiMethodName]);
      selectHandler[apiMethodName](request, response, nextStep);
    } else if (
      (request.headers.authorization !== undefined
      && request.headers.authorization.indexOf('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjlkOWQyN2Vl') === -1)
      || (request.query.api_key !== undefined
      && request.query.api_key.indexOf('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjlkOWQyN2Vl') === -1)
    ) {
      nextStep();
      // return null;
    } else if (utils.getEnv(apiMethodName) !== 'enabled') {
      // query db, send resp with order id
      response.status(403).send();
      nextStep();
    } else {
      console.log(apiMethodName);
      console.log(selectHandler[apiMethodName]);
      selectHandler[apiMethodName](request, response, nextStep);
    }
    // nextStep();
    // const rawBody = request.body.toString('utf8');
  } catch (err) {
    nextStep(err);
  }
}
