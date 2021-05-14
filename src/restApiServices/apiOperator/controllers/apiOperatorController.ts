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

export const isOk = (
  req: Request,
  res: Response,
  next: NextFunction
): Express.Response => res.status(200).send();

export const routes = [
  { method: 'get',
    endPoint: `${baseUrl}/openorders`,
    controller: getOpenOrders
  },
  { method: 'post',
    endPoint: `${baseUrl}/processorder`,
    controller: markOrderProcessed
  },
  { method: 'get',
    endPoint: healthCheckRestOrdersUrl,
    controller: isOk
  }
];
