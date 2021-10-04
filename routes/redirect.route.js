const router = require('express').Router();
redirectController = require('../controllers/redirect.controller');

router.get('/:slug', (req, res)=>{
    redirectController.redirect(req, res);
});

// Export Redirect routes
module.exports = router;