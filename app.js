const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const logger = require('./services/logger');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
if(process.env.NODE_ENV === 'development'){
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require('./swagger.json');
  app.use(
    '/docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
}


// Connect to Mongoose
connect();

// Use Api routes in the App
app.use('/api', apiRoutes);

// For Invalid URL
app.use('*', (req, res)=> res.status(400).json({
    message: 'Invalid URL'
}));

// Listen to port
function listen() {
    var port = process.env.PORT || 3000;
    app.listen(port, () => {
        logger.log('info', "[app] Listening on PORT: "+port, {tags: 'app,port'});
    });
}


function connect() {
    mongoose.connection
      .on('error', errorMessage)
      .on('disconnected', connect)
      .once('open', listen);
    return mongoose.connect(process.env.MONGODB_URL, {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
function errorMessage(){
    logger.log('error', "[app] Error connecting to MongoDB.", {tags: 'app,mongo'});
}