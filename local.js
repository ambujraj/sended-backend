const app = require('./app.js');

// Server listen
var port = process.env.PORT || 3000;
app.listen(port, () => {
        logger.log('info', "[app] Listening on PORT: "+port, {tags: 'app,port'});
});