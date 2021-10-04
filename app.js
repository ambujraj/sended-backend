const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api.route');
const redirectRoutes = require('./routes/redirect.route');
const rateLimit = require("express-rate-limit");
const logger = require('./services/logger');
require('dotenv').config();

app.set('trust proxy', 1);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
const writeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 15
});
const readLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 30
});
const otherLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 10
});


if(process.env.NODE_ENV === 'development'){
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require('./swagger.json');
  app.use(
    '/docs',
    otherLimiter,
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
}


// Connect to Mongoose
connect();

// Use Api routes in the App
app.use('/api',writeLimiter, apiRoutes);

// For Calling the Short URL
app.use('/share',readLimiter, redirectRoutes);

// For Invalid URL
app.use('*',otherLimiter, (req, res)=> res.status(400).json({
    message: 'Invalid URL'
}));

// Listen to port
// function listen() {
//     var port = process.env.PORT || 3000;
//     app.listen(port, () => {
//         logger.log('info', "[app] Listening on PORT: "+port, {tags: 'app,port'});
//     });
// }




function connect() {
    mongoose.connection
      .on('error', errorMessage)
      .on('disconnected', connect);
    return mongoose.connect(process.env.MONGODB_URL, {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
function errorMessage(){
    logger.log('error', "[app] Error connecting to MongoDB.", {tags: 'app,mongo'});
}

module.exports = app;