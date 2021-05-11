"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
const utils = require('../utils.js');
const dbOptions = { database: '', host: '', password: '', port: '', user: '', connectionTimeoutMillis: 1000, idleTimeoutMillis: 100, max: 15 };
dbOptions.user = utils.getEnv('DB_USER');
dbOptions.password = utils.getEnv('DB_PASSWORD');
dbOptions.host = utils.getEnv('DB_HOST');
dbOptions.database = utils.getEnv('DB_NAME');
dbOptions.port = utils.getEnv('DB_PORT');
dbOptions.max = Number.parseInt(utils.getEnv('MAX_DB_CONNECTIONS'), 10);
dbOptions.idleTimeoutMillis = Number.parseInt(utils.getEnv('DB_IDLE_TIMEOUT_MS'), 10);
if ((utils.getEnv('DB_SSL')) === 'true') {
    dbOptions.ssl = {
        rejectUnauthorized: false,
    };
}
const dbPool = new Pool(dbOptions);
exports.queryDb = ((...q) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('queryDb start', q);
    const resToUser = {
        result: [],
        error: undefined
    };
    const client = yield dbPool.connect();
    // .then(() => console.log('db connected'));
    const start = Date.now();
    yield client.query(...q)
        .then((res) => {
        const duration = Date.now() - start;
        console.log('duration DB', duration);
        if (duration > 1000) {
            let textQuery = q.toString();
            textQuery = textQuery.replace(/\s\s+/g, ' ');
            // this.logger('dbConnector_long_query_execution', { query: textQuery, duration, rows: res.rowCount }, 'debug');
            console.log('dbConnector_long_query_execution', { query: textQuery, duration, rows: res.rowCount });
        }
        [resToUser.result] = [res.rows];
        return resToUser;
    })
        .catch(e => {
        console.log('dbConnector error', e);
        resToUser.error = e;
        return resToUser;
    });
    client.release();
    return resToUser;
}));
console.log('connecting to db: ', dbOptions.database, 'SSL:', utils.getEnv('DB_SSL'));
//# sourceMappingURL=dbConnector.js.map