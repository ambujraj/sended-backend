'use strict';

/*
 * Module dependencies.
 */

const data = require('../app/controllers/data');
const upload = require('../app/controllers/upload');

/**
 * Route middlewares
 */


const fail = {
  failureRedirect: '/'
};

/**
 * Expose routes
 */

module.exports = function(app, passport) {
  

  
  app.get('/upload', upload.uploadFile);
  app.get('/record'. data.record);
//   app.post(
//     '/record', data.rec,
//   );

  
  

  //app.param('userId', users.load);

//   // article routes
//   app.param('id', articles.load);
//   app.get('/articles', articles.index);
//   app.get('/articles/new', auth.requiresLogin, articles.new);
//   app.post('/articles', auth.requiresLogin, articles.create);
//   app.get('/articles/:id', articles.show);
//   app.get('/articles/:id/edit', articleAuth, articles.edit);
//   app.put('/articles/:id', articleAuth, articles.update);
//   app.delete('/articles/:id', articleAuth, articles.destroy);

  // home route
  app.get('/', articles.index);

  // comment routes
//   app.param('commentId', comments.load);
//   app.post('/articles/:id/comments', auth.requiresLogin, comments.create);
//   app.get('/articles/:id/comments', auth.requiresLogin, comments.create);
//   app.delete(
//     '/articles/:id/comments/:commentId',
//     commentAuth,
//     comments.destroy
//   );

  // tag routes
//   app.get('/tags/:tag', tags.index);

  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf('not found') ||
        ~err.message.indexOf('Cast to ObjectId failed'))
    ) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', { error: err.stack });
      return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    const payload = {
      url: req.originalUrl,
      error: 'Not found'
    };
    if (req.accepts('json')) return res.status(404).json(payload);
    res.status(404).render('404', payload);
  });
};