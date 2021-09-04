const router = require('express').Router();

router.get('/', function (req, res){
    res.json({
        status: 'API Working.',
        message: 'Welcome to the Sended API.'
    });
});

// Export API routes
module.exports = router;