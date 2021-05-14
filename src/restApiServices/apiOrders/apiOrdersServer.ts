import express from 'express';
import cors from 'cors';
import RequestId from 'express-request-id';
import cookieParser from 'cookie-parser';
import getRawBody from 'raw-body';
import { routes } from './controllers/apiOrdersController';
import * as utils from './utils';

const appPort = Number.parseInt(utils.getEnv('REST_ORDERS_PORT'), 10);
const serviceName = utils.getEnv('REST_ORDERS_SERVICENAME');

class ApiOperatorServer {
  readonly appLogger: Function;

  readonly errorLogger: Function;

  routes: Array<object>;

  restPort: number;

  appName: string;

  baseUrl: string;

  public app: express.Application;

  constructor(routesArray: Array<object>, restPort: number, appName: string, baseUrl: string) {
    // this.errorLogger = logger.restErrorLogger;
    // this.appLogger = logger.appLogger;
    this.app = express();
    this.appName = appName;
    this.routes = routesArray;
    this.baseUrl = baseUrl;
    this.restPort = restPort;
    this.app.set('port', restPort);
    this.app.use(cors());
    this.app.use(RequestId());
    this.app.use((req, res, next) => {
      getRawBody(req, {
        length: req.headers['content-length'],
        limit: '1mb',
        encoding: 'utf8'
        // eslint-disable-next-line consistent-return
      }, (err, string) => {
        if (err) return next(err);
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        req.rawBody = string;
        next();
      });
    });
    this.app.use(cookieParser());
    this.registerRoutes();
  }

  registerRoutes(this): void {
    this.app.use((req, res, next) => {
      // this.logger(this.appName, req, 'debug');
      next();
    });
    this.app.use((req, res, next) => {
      req.connection.on('close', () => {
        // code to handle connection abort
      });
      next();
    });
    // handle errors
    this.app.use((err, req, res, next) => {
      console.log(`REST ERROR ${err}`);
      // this.errorLogger(this.appName, { err, info: ['request', req.id, JSON.stringify(util.inspect(req.rawHeaders)), JSON.stringify(util.inspect(req.params)),
      //   JSON.stringify(util.inspect(req.query)), JSON.stringify(util.inspect(req.body)), err.message] });
      res.status(err.status || 500);
      res.send({ error: err.message });
    });
    this.routes.forEach((route: { method: string; endPoint: string; controller: object}): void => {
      this.app[route.method](`${this.baseUrl}${route.endPoint}`, route.controller);
    });
  }

  public start(this): void {
    this.app.listen(this.restPort, () => {
      // this.appLogger(this.appName,
      //   { info: [` server is running on port ${this.restPort}`] }, 'info');
      console.log(` server is running on port ${this.restPort}`);
    });
  }
}

const app = new ApiOperatorServer(routes, appPort, serviceName, '');

if (require.main === module) {
  app.start();
}
