import { Response, Request, NextFunction } from 'express';
import { apiMethods } from '../../apiMethods';
import { processApiRequest } from '../apiRequestProcessor';

const utils = require('../../../utils');

const restOrdersBaseUrl = '/orders';
const healthCheckRestOrdersUrl = utils.getEnv('HEALTHCHECK_REST_ORDERS_URL');

export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const apiMethodGroup = 'apiOrders';
  const apiMethod = 'placeOrder';
  const apiMethodName = apiMethods[apiMethodGroup][apiMethod].request;
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
