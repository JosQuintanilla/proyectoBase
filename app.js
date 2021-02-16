const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./src/config/logger')('app');
const xss = require('xss-filters');
const config = require('./config');

console.log('app - lectura env');


// Create Express app
var app = express();

// Use morgan http logger
app.use(morgan('combined'));
console.log('app - v: ',process.env.npm_package_version);
// Protect application from some well-known vulnerabilities
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', require('./src/routes'));
if (config.env == 'production') {
    var compression = require('compression');
    app.disable('x-powered-by');
    app.use(compression());
}

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    if (res.headersSent) {
        return next();
    } else {
        return res.status(404).send(xss.inHTMLData({ message: 'Route' + req.url + ' Not found.' }));
    }
});

// Error handler
app.use(function (err, req, res, next) {
    // Log error
    logger.error(JSON.stringify(err, null, 2));
    // Skip to default error handler when a response has already been sent
    if (res.headersSent) {
        return next(err);
    }

    // Send error information to the client
    res.status(err.status || err.codError || 500);
    res.json(err);
});

module.exports = app;