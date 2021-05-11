import express = require('express');
declare class AppServer {
    routes: Array<object>;
    restPort: string;
    appName: string;
    baseUrl: string;
    validatorSchemaPath: string;
    app: express.Application;
    private SwaggerValidator;
    /**
     * Constructor.
     *
     * @class AppServer
     * @constructor
     */
    constructor(routesArray: Array<object>, restPort: string, appName: string, baseUrl: string, validatorSchemaPath?: string);
    registerRoutes(this: any): void;
    start(this: any): void;
}
export default AppServer;
