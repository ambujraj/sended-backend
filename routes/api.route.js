const router = require('express').Router();
const multer = require('multer');
const inputController = require('../controllers/input.controller');
require('dotenv').config();

router.get('/', (req, res, next) => {
    let key = req.get('X-API-KEY');
    if(key==process.env.API_KEY){
      res.status(200).json({
        status: 'API Working.',
        message: 'Welcome to the Sended API.'
    });
    }
    else{
      res.status(401).send('Unauthorized');
    }
    
});

router.get('/upload', (req, res, next)=>{
  let key = req.get('X-API-KEY');
    if(key==process.env.API_KEY){
      res.status(400).json({
        message: 'Use POST request for upload.'
      });
    }
    else{
      res.status(401).send('Unauthorized');
    }
  
});

router.post('/upload', (req, res, next) => {
  let key = req.get('X-API-KEY');
    if(key==process.env.API_KEY){
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
)
    }
    else{
      res.status(401).send('Unauthorized');
    }
});
    
router.route('/*')
  .get((req, res, next)=>{
    let key = req.get('X-API-KEY');
    if(key==process.env.API_KEY){
      res.status(400).json({
        message: 'Invalid Request'
      });
    }
    else{
      res.status(401).send('Unauthorized');
    }
    
})
.post((req, res, next)=>{
  let key = req.get('X-API-KEY');
    if(key==process.env.API_KEY){
      res.status(400).json({
        message: 'Invalid Request'
      });
    }
    else{
      res.status(401).send('Unauthorized');
    }
    
});

// Export API routes
module.exports = router;