const mysql =require("mysql2/promise");
// Create the connection pool. The pool-specific settings are the defaults
const mySqlPool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    database: process.env.MY_SQL_DB,
    password:process.env.MY_SQL_PASSWORD,
  });
  module.exports =mySqlPool;