const Inputs = require('../models/inputs.model');
const Shorts = require('../models/shorts.model');
const logger = require('../services/logger');
const mongoose = require('mongoose');
const { LexRuntimeV2 } = require('aws-sdk');

// Handle create inputs data
exports.addToDB = (shortLink, s3FileLink, presignedUrl, ipAddress) => {
    var today = new Date(Date.now());
    var formattedDate = today.toUTCString();

    var input = new Inputs();
    input.short_link = shortLink ? shortLink : input.shortLink;
    input.s3_file_link = s3FileLink ? s3FileLink : input.s3FileLink;
    input.presigned_url = presignedUrl ? presignedUrl : input.presignedUrl;
    input.ip_address = ipAddress ? ipAddress : input.ipAddress;
    input.created_at = formattedDate;

    input.save(function (err) {
        if (err){
            logger.log('error', "[DBFunction -> addToDB] "+err, {tags: 'DBFunction,db'});
            
            res.status(408).json({
                status: 'Error',
                message: 'Something is Wrong.'
            });
        }
    });
};

// Insert short url data
exports.insertShortUrl = (slug, originalURL) => {
    var today = new Date(Date.now());
    var formattedDate = today.toUTCString();

    var short = new Shorts();
    short.original_url = originalURL;
    short.slug = slug;
    short.created_at = formattedDate;

    short.save(function (err) {
        if (err){
            logger.log('error', "[DBFunction -> addToShortenDB] originalURL: "+originalURL+" Slug: "+slug+" StackTrace: "+err, {tags: 'DBFunction,db'});
            
            res.status(408).json({
                status: 'Error',
                message: 'Something is Wrong.'
            });
        }
    });
};

exports.getOriginalURL = async (slug) => {
    let originalURL;
    //return await Adventure.findOne({ slug: slug }).exec();
    let queryReturn = await Shorts.findOne({slug: slug}, (err, short) =>{
        if (err) {
            originalURL = null;
        }
        else{
            originalURL = short.original_url;
        }
        
    }).clone();
    return originalURL;
    
}

exports.updateHit = async (slug) => {
    let short = await Shorts.findOneAndUpdate({slug: slug}, {$inc: {'clicks': 1}});
    return short.clicks+1;
}