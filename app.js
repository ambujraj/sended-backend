const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./Routes/api');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true});
var db = mongoose.connection;

// Check Connection
if(!db)
    console.log("Error connecting the DB.");
else
    console.log("DB Connection Established.");

// Setup server port
var port = process.env.PORT || 3000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello from Sended. You can navigate to /api for more.'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Listen to port
app.listen(port, () => {
    console.log('listening on port '+port);
});

