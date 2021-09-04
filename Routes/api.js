const router = require('express').Router();
const multer = require('multer');

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
    
    .get(inputController.index)
    .post(
        multer({ dest: 'temp/', limits: { fieldSize: 1e+9 } }).single(
          'file'
        ),
        inputController.upload
      );

// Export API routes
module.exports = router;