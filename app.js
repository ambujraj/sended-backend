const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

