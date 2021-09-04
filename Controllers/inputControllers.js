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
    
        aws.config.setPromisesDependency();
        const s3 = new aws.S3();
        var params = {
          //ACL: 'public-read',
          Bucket: process.env.S3_BUCKET,
          Body: fs.createReadStream(req.file.path),
          Key: `${req.file.originalname}`
        };
    
        s3.upload(params, (err, data) => {
          if (err) {
            console.log('Error while trying to upload to S3 bucket', err);
          }
    
          if (data) {
            //fs.unlinkSync(req.file.path); // Empty temp folder --> // might case concurrency issue
            
            let shortLink = req.body.shortLink;
            let s3FileLink = data.Location;
            let macAddress = req.body.macAddress;
            let ipAddress = req.body.ipAddress;

            const dbFunction = require('../middlewares/DBFunction');
            dbFunction.addToDB(shortLink, s3FileLink, macAddress, ipAddress);

            if(err){
                res.json({
                    status: "Error",
                    message: err,
                });
            }
            res.json({
                status: "Success",
                message: "File uploaded successfully",
                link: shortLink
            });
          }
        });
    
}


