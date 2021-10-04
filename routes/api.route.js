const router = require('express').Router();
const multer = require('multer');
const inputController = require('../controllers/input.controller');

router.get('/', (req, res) => {
    res.status(200).json({
        status: 'API Working.',
        message: 'Welcome to the Sended API.'
    });
});

router.get('/upload', (req, res)=>{
  res.status(400).json({
    message: 'Use POST request for upload.'
  });
});

router.post('/upload', (req, res) => {
var upload = multer({  dest: '/tmp/', limits: { fieldSize: 1e+9 } }).single('file');
upload(req, res, (err) => {
    if (err) {
      res.status(400).json({
        message: 'Number of Files is not Valid'
      })
    }
    else{
      inputController.upload(req, res);
    }
  }
)});
    
router.route('/*')
  .get((req, res)=>{res.status(400).json({
    message: 'Invalid Request'
  });
})
.post((req, res)=>{res.status(400).json({
  message: 'Invalid Request'
});
});

// Export API routes
module.exports = router;