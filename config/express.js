'use strict';

/**
 * Module dependencies.
 */

const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const upload = require('multer')();

const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const helpers = require('view-helpers');
const requireHttps = require('./middlewares/https');
const config = require('./');
const pkg = require('../package.json');

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function(app, passport) {
  
  app.use(requireHttps);

  // Compression middleware (should be placed before express.static)
  

  app.use(
    cors({
      origin: ['*' /*,add new here*/],
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      
    })
  );

  // Static files middleware
  app.use(express.static(config.root + '/public'));

  

  
  // Logging middleware
  app.use(morgan(log));
  

//   // expose package.json to views
//   app.use(function(req, res, next) {
//     res.locals.pkg = pkg;
//     res.locals.env = env;
//     next();
//   });

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(upload.single('file'));
  app.use(
    methodOverride(function(req) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );

  

 

//   // connect flash for flash messages - should be declared after sessions
//   app.use(flash());

  // should be declared after session and flash
//   app.use(helpers(pkg.name));

  

  if (env === 'development') {
    app.locals.pretty = true;
  }
};