import { DbConnOptions, QueryDbResponse } from './dbOperatorInterfaces';

const { Pool } = require('pg');
const utils = require('../utils');

const dbOptions: DbConnOptions = { database: '', host: '', password: '', port: '', user: '', connectionTimeoutMillis: 3000, idleTimeoutMillis: 100, max: 15 };
let dbSuffix = '';
if (utils.getEnv('DB_RUN_LOCALLY') === 'true') {
  dbSuffix = '_LOCAL';
}
dbOptions.user = utils.getEnv(`DB_USER${dbSuffix}`);
dbOptions.password = utils.getEnv(`DB_PASSWORD${dbSuffix}`);
dbOptions.host = utils.getEnv(`DB_HOST${dbSuffix}`);
dbOptions.database = utils.getEnv(`DB_NAME${dbSuffix}`);
dbOptions.port = utils.getEnv(`DB_PORT${dbSuffix}`);
dbOptions.max = Number.parseInt(utils.getEnv('MAX_DB_CONNECTIONS'), 10);
dbOptions.idleTimeoutMillis = Number.parseInt(utils.getEnv('DB_IDLE_TIMEOUT_MS'), 10);


if ((utils.getEnv('DB_SSL')) === 'true') {
  dbOptions.ssl = {
    rejectUnauthorized: false,
    // ca: fs.readFileSync(utils.getEnvironmentVariable('DB_SSL_CLIENT_PATH')),
    // cert: fs.readFileSync(utils.getEnvironmentVariable('DB_SSL_CERT_PATH')),
    // key: fs.readFileSync(utils.getEnvironmentVariable('DB_SSL_KEY_PATH')),
  };
}

const dbPool = new Pool(dbOptions);

export const queryDb = (async (...q) => {
  console.log('queryDb start', q);
  const resToUser: QueryDbResponse = {
    result: [],
    error: {
      code: 0,
      description: ''
    }
  };
  const client = await dbPool.connect();
  // .then(() => console.log('db connected'));
  const start = Date.now();
  await client.query(...q)
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
      resToUser.error.description = e;
      resToUser.error.code = 1;
      return resToUser;
    });
  client.release();
  return resToUser;
});
console.log('connecting to db: ', dbOptions, 'SSL:', utils.getEnv('DB_SSL'));
