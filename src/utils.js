const appRoot = require('app-root-path');
require('dotenv').config({ path: `${appRoot}/.env` });

const getEnv = (variableName) => {
  return (
    process.env[variableName]
    || (() => {
      throw new Error(
        `No such environment variable ${variableName}`
      );
    })()
  );
};

module.exports = {
  getEnv
};
