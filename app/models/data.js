'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');


const Schema = mongoose.Schema;


/**
 * Data Schema
 */

const dataSchema = new Schema({
    shortLink: { type: String, default: '' },
    s3FileLink: { type: String, default: '' },
    macAddress: { type: String, default: '' },
    ipAddress: { type: String, default: '' },
    createdAt: { type: Date, default:Date.now }

});


mongoose.model('Data', dataSchema);