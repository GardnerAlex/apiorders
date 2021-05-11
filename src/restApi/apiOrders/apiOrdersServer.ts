import { routes } from './controllers/apiOrdersController';
import { AppServer } from '../restServer';

const appPort = Number.parseInt(process.env.REST_ORDERS_PORT, 10);
const serviceName = process.env.REST_ORDERS_SERVICENAME;

const app = new AppServer(routes, appPort, serviceName, '');

if (require.main === module) {
  app.start();
}
