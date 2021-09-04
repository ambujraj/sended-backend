const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

connect();
function listen() {
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log('Express app started on port ' + port);
}


function connect() {
    mongoose.connection
      .on('error', console.log)
      .on('disconnected', connect)
      .once('open', listen);
    return mongoose.connect(config.db, {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
