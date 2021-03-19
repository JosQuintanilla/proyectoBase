const mysql = require('mysql');
const config = require('../../../config');
logger = require('../../config/logger')('MySQLConeect');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'personas',
    insecureAuth : true
  });

module.exports = connection;