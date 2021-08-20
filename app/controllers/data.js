'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const only = require('only');
const Data = mongoose.model('Data');
var logger = require('../services/logger');



/**
 * Create data
 */

 exports.record = async(function*(req, res) {
    const data = new Article(only(req.body, 'shortLink s3FileLink macAddress ipAddress'));
    data.createdDate = Date.now();
    try {
      yield data.save();
      logger.log('info', "[Inserted] new data saved successfully", {tags: 'inserted,new'});
      
    } catch (err) {
      logger.log('error', "[Failed] new data failed to save", {tags: 'inserted,new'});
    //   return res.status(400).send({
    //     message: errorHandler.getErrorMessage(err)
    //   });
    }
  });