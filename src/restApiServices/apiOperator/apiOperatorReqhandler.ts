import { ApiOperatorDbInterface } from './dbServiceApiOperator/dbOperatorInterfaces';
import { apiOperatorMethods } from './apiOperatorMethods';
import { MarkOrderProcessed } from './apiOperatorInterfaces';

const utils = require('./utils');
// var util = require('util');

const dbService: ApiOperatorDbInterface = require('./dbServiceApiOperator/dbConnectors/restOperator/operatorDbMethods');

async function getOrdersToProcessHandler(request: any, response: any, nextStep: Function) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  console.log('request.headers.getOrdersToProcessHandler', request.headers.authorization);
  // получить открытые необработанные заказы из БД,
  const openOrders = await dbService.getOpenOrders();
  console.log('openOrders', openOrders);
  response.status(200).send(openOrders);
}

async function markOrderProcessedHandler(request: any, response: any, nextStep: Function) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  console.log('request.headers.markOrderProcessedHandler', request.headers.authorization);
  const requestBody: MarkOrderProcessed = request.body;
  console.log('requestBody.markOrderProcessedHandler', requestBody);
  // получить открытые необработанные заказы из БД,
  const markOrderProcessedResult = await dbService.updateOrderStatus(4, requestBody.order_id);
  console.log('markOrderProcessedError container', markOrderProcessedResult.error);
  response.status(200).send(markOrderProcessedResult.error);
}

const selectHandler = {
  [apiOperatorMethods.apiOperator.getOpenOrders.request]: getOrdersToProcessHandler,
  [apiOperatorMethods.apiOperator.markOrderProcessed.request]: markOrderProcessedHandler
};

// eslint-disable-next-line @typescript-eslint/require-await
export async function processApiRequest(request, response, nextStep, apiMethodGroup, apiMethodName): Promise<void> {
  try {
    if (request.headers.authorization.indexOf('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjlkOWQyN2Vl') === -1) {
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
    // const rawBody = request.body.toString('utf8');
  } catch (err) {
    nextStep(err);
  }
}
