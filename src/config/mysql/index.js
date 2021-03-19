var mysql      = require('mysql');
const logger = require('../logger')('mongoose');
const config = require('../../../config');

var connection = mysql.createConnection({
    host     : config.MYSQL_HOST,
    database : config.MYSQL_DATABASE,
    user     : config.MYSQL_USER,
    password : config.MYSQL_PASS,
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

connection.queryPersonas('SELECT * FROM personas', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
});

connection.end();