import { Response, Request, NextFunction } from 'express';
import { apiOperatorMethods } from '../apiOperatorMethods';
import { processApiRequest } from '../apiOperatorReqhandler';

const utils = require('../utils');

const baseUrl = '/operator';
const healthCheckRestOrdersUrl = utils.getEnv('HEALTHCHECK_REST_OPERATOR_URL');

export const getOpenOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const apiMethodGroup = 'apiOperator';
  const apiMethod = 'getOpenOrders';
  const apiMethodName = apiOperatorMethods[apiMethodGroup][apiMethod].request;
  await processApiRequest(req, res, next, apiMethodGroup, apiMethodName);
};

export const getOrderDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const apiMethodGroup = 'apiOperator';
  const apiMethod = 'getOrderDetails';
  const apiMethodName = apiOperatorMethods[apiMethodGroup][apiMethod].request;
  await processApiRequest(req, res, next, apiMethodGroup, apiMethodName);
};

export const markOrderProcessed = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const apiMethodGroup = 'apiOperator';
  const apiMethod = 'markOrderProcessed';
  const apiMethodName = apiOperatorMethods[apiMethodGroup][apiMethod].request;
  await processApiRequest(req, res, next, apiMethodGroup, apiMethodName);
};

export const setToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const apiMethodGroup = 'apiOperator';
  const apiMethod = 'setToken';
  const apiMethodName = apiOperatorMethods[apiMethodGroup][apiMethod].request;
  await processApiRequest(req, res, next, apiMethodGroup, apiMethodName);
};

export const isOk = (
  req: Request,
  res: Response,
  next: NextFunction
): Express.Response => res.status(200).send();

export const err404 = (
  req: Request,
  res: Response,
  next: NextFunction
): Express.Response => {
  console.log('404 request get', req.originalUrl);
  return res.status(404).send();
};

export const routes = [
  { method: 'get',
    endPoint: `${baseUrl}/openorders`,
    controller: getOpenOrders
  },
  { method: 'get',
    endPoint: `${baseUrl}/orderdetails`,
    controller: getOrderDetails
  },
  { method: 'post',
    endPoint: `${baseUrl}/processorder`,
    controller: markOrderProcessed
  },
  { method: 'post',
    endPoint: `${baseUrl}/settoken`,
    controller: setToken
  },
  { method: 'get',
    endPoint: healthCheckRestOrdersUrl,
    controller: isOk
  },
  { method: 'get',
    endPoint: '/*',
    controller: err404
  }
];
