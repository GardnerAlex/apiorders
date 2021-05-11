"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiOrdersController_1 = require("./controllers/apiOrdersController");
const restServer_1 = require("../restServer");
const appPort = Number.parseInt(process.env.REST_ORDERS_PORT, 10);
const serviceName = process.env.REST_ORDERS_SERVICENAME;
const app = new restServer_1.AppServer(apiOrdersController_1.routes, appPort, serviceName, '');
if (require.main === module) {
    app.start();
}
//# sourceMappingURL=apiOrdersServer.js.map