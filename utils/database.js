const mysql = require("mysql2");
const util = require("util");
const config = require("../config/config.json");
const pool = mysql.createConnection({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
});
const pool1 = mysql.createPool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
});
const query_new = util.promisify(pool.query).bind(pool);
const db = pool1.promise();
module.exports = {
  query_new,
  pool,
  db,
};
