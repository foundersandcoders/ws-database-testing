const { Pool } = require("pg");

const url = require("url");
require("env2")("./config.env");

//important! Below we specify what value of DB_URL should be depending on whether it's a test environment or not
//in package.json we specified script for testing: NODE_ENV=test node tests/test.js
let DB_URL = process.env.DB_URL;
if (process.env.NODE_ENV === "test") {
  DB_URL = process.env.TEST_DB_URL;
}

if (!DB_URL) throw new Error("Enviroment variable DB_URL must be set");

const params = url.parse(DB_URL);
const [username, password] = params.auth.split(":");

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: username,
  password: password
};

options.ssl = options.host !== "localhost";

module.exports = new Pool(options);
