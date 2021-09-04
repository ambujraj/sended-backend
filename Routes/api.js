const router = require('express').Router();

router.get('/', function (req, res){
    res.json({
        status: 'API Working.',
        message: 'Welcome to the Sended API.'
    });
});

// Import Input controller
const inputController = require('../controllers/inputControllers');

// Input routes
router.route('/upload')
    .post(inputController.upload)
    .get(inputController.index);

// Export API routes
module.exports = router;