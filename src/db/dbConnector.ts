import { DbConnOptions } from './dbInterfaces';

const { Pool } = require('pg');
const utils = require('../utils.js');

const dbOptions: DbConnOptions = { database: '', host: '', password: '', port: '', user: '', connectionTimeoutMillis: 1000, idleTimeoutMillis: 100, max: 15 };
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
    // ca: fs.readFileSync(utils.getEnvironmentVariable('DB_SSL_CLIENT_PATH')),
    // cert: fs.readFileSync(utils.getEnvironmentVariable('DB_SSL_CERT_PATH')),
    // key: fs.readFileSync(utils.getEnvironmentVariable('DB_SSL_KEY_PATH')),
  };
}

const dbPool = new Pool(dbOptions);

export const queryDb = (async (...q) => {
  console.log('queryDb start', q)
  const resToUser = {
    result: [],
    error: undefined
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
      resToUser.error = e;
      return resToUser;
    });
  client.release();
  return resToUser;
});
console.log('connecting to db: ', dbOptions.database, 'SSL:', utils.getEnv('DB_SSL'));
