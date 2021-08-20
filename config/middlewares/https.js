// Force https

module.exports = function requireHTTPS(req, res, next) {
    
    if (
      !req.secure &&
      process.env.NODE_ENV !== 'development'
    ) {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  };