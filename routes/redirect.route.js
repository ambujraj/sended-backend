const router = require('express').Router();
redirectController = require('../controllers/redirect.controller');
require('dotenv').config();

router.get('/:slug', (req, res, next)=>{
    let key = req.get('X-API-KEY');
    if(key==process.env.API_KEY){
        redirectController.redirect(req, res);
    }
    else{
      res.status(401).send('Unauthorized');
    }
    
});

// Export Redirect routes
module.exports = router;