const fs = require('fs');

const dbConnection = require('./db_connection.js');

if ((process.env.NODE_END = "test")) {
  sql = fs.readFileSync(`${__dirname}/test_db_build.sql`).toString();
} else {
  sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();
}

const runDbBuild = dbConnection.query(sql, (err, res) => {
  if (err) throw err;
  console.log('Users table created with result: ', res);
});

module.exports = runDbBuild;
