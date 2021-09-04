const Inputs = require('../models/inputs');
const aws = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

// Handle index actions
// -- For testing purposes only
exports.index = function (req, res) {
    Inputs.get(function (err, inputs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "Success",
            message: "Data retrieved successfully",
            data: inputs
        });
    });
};

exports.upload = function (req, res) {
        if(req.file.size>1e+9){
            res.json({
                status: "Error",
                message: "File size too large"
            });
        }
        aws.config.setPromisesDependency();
        const s3 = new aws.S3();
        const fileName = Date.now()+"_"+req.file.originalname;
        
        var params = {
          //ACL: 'public-read',
          Bucket: process.env.S3_BUCKET,
          Body: fs.createReadStream(req.file.path),
          Key: fileName
        };
    
        s3.upload(params, (err, data) => {
          if (err) {
            console.log('Error while trying to upload to S3 bucket', err);
          }
    
          if (data) {
            fs.unlinkSync(req.file.path); // Empty temp folder 
            
            //get presigned url
            var params = {
                Bucket: process.env.S3_BUCKET,
                Key: fileName,
                Expires: 432000
            };
            s3.getSignedUrl('getObject', params, async (err, url) => {
                if (err) {
                    console.log('Error while trying to get signed url', err);
                }
                if (url) {
                    //console.log(url);
                    const urlShortener = require('../middlewares/shortUrl');
                    let shortLink = await urlShortener.shorten(url);
                    let s3FileLink = data.Location;
                    let presignedUrl = url;
                    let macAddress = req.body.macAddress;
                    let ipAddress = req.body.ipAddress;

                    const dbFunction = require('../middlewares/DBFunction');
                    dbFunction.addToDB(shortLink, s3FileLink, presignedUrl, macAddress, ipAddress);

                    if(err){
                        res.json({
                            status: "Error",
                            message: err,
                        });
                    }
                    //res.status(200);
                    res.json({
                        status: "Success",
                        message: "File uploaded successfully",
                        link: shortLink
                    });
                }
            });
          }
        });
    
}


