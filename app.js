const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


connect();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('*', (req, res) => {
    res.send('404');
});


var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening on port 3000!');
});


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
