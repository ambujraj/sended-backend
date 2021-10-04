const Inputs = require('../models/inputs.model');
const aws = require('aws-sdk');
const fs = require('fs');
const logger = require('../services/logger');
const s3 = new aws.S3();
const urlShortener = require('../middlewares/shortUrl');
const dbFunction = require('../middlewares/DBFunction');
require('dotenv').config();


exports.upload = (req, res) => {
        if(!req.file){
            res.status(400).json({
                error: 'No File Uploaded'
            });
        }
        else if(req.file.size==0){
            res.status(400).json({
                error: 'File is empty'
            });
        }
        else if(req.file.size>1e+9){
            fs.unlinkSync(req.file.path); // Empty temp folder 
            res.status(400).json({
                status: "Error",
                message: "File size too large"
            });
        }
        else{
            aws.config.setPromisesDependency();
            
            const fileName = Date.now()+"_"+req.file.originalname;
            
            var params = {
            //ACL: 'public-read',
            Bucket: process.env.S3_BUCKET,
            Body: fs.createReadStream(req.file.path),
            Key: fileName
            };
        
            s3.upload(params, (err, data) => {
            if (err) {
                logger.log('error', "[input.controller] Error while trying to upload to S3 bucket: "+err, {tags: 'inputControllers,s3'});
                res.status(408).json({
                    status: "Error",
                    message: 'Something is Wrong.',
                });
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
                        logger.log('error', "[input.controller] Error while trying to get signed url: "+err, {tags: 'inputControllers,s3'});
                        res.status(408).json({
                            status: "Error",
                            message: 'Something is Wrong.',
                        });
                        
                    }
                    if (url) {
                        let shortLink = process.env.BASE_URL + "/share/" + await urlShortener.shorten(url);
                        let s3FileLink = data.Location;
                        let presignedUrl = url;
                        let ipAddress = req.body.ipAddress;

                        // TODO Add async await to db functions
                        dbFunction.addToDB(shortLink, s3FileLink, presignedUrl, ipAddress);

                        if(err){
                            logger.log('error', "[input.controller]: "+err, {tags: 'inputControllers,db'});
                            res.status(408).json({
                                status: "Error",
                                message: 'Something is Wrong.',
                            });
                        }
                        
                        logger.log('info', "[input.controller] New File Uploaded: "+shortLink, {tags: 'input.controller'});
                        res.status(200).json({
                            status: "Success",
                            message: "File uploaded successfully",
                            link: shortLink
                        });
                    }
                });
            }
            });
        }
}
