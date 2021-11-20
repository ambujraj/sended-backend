const router = require('express').Router();
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const inputController = require('../controllers/inputControllers');
s3 = new aws.S3();
require('dotenv').config();

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
let filename;
let data;
let upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET,
      key: function (req, file, cb) {
          data=file;
          filename = Date.now()+"_"+file.originalname;
          cb(null, filename);
      }
  })
});

router.post('/upload', upload.array('file',1), (req, res) => {
    inputController.upload(req, res, data, filename);
});
// router.post('/upload', (req, res) => {
// var upload = multer({  dest: '/tmp/', limits: { fieldSize: 1e+9 } }).single('file');
// upload(req, res, (err) => {
//     if (err) {
//       res.status(400).json({
//         message: 'Number of Files is not Valid'
//       })
//     }
//     else{
//       inputController.upload(req, res);
//     }
//   }
// )});
    
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