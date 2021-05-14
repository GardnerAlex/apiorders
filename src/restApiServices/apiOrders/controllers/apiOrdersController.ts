import { Response, Request, NextFunction } from 'express';
import { apiOrdersMethods } from '../apiOrdersMethods';
import { processApiRequest } from '../apiOrdersReqHandler';

const utils = require('../utils');

const restOrdersBaseUrl = '/orders';
const healthCheckRestOrdersUrl = utils.getEnv('HEALTHCHECK_REST_ORDERS_URL');

export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const apiMethodGroup = 'apiOrders';
  const apiMethod = 'placeOrder';
  const apiMethodName = apiOrdersMethods[apiMethodGroup][apiMethod].request;
  await processApiRequest(req, res, next, apiMethodGroup, apiMethodName);
};

export const isOk = (
  req: Request,
  res: Response,
  next: NextFunction
): Express.Response => res.status(200).send();

export const routes = [
  { method: 'post',
    endPoint: `${restOrdersBaseUrl}/placeorder`,
    controller: placeOrder
  },
  { method: 'get',
    endPoint: healthCheckRestOrdersUrl,
    controller: isOk
  }
];
