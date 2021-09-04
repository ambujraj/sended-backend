
const mongoose = require('mongoose');
 

// Input Schema 
 const inputSchema = mongoose.Schema({
     shortLink: { type: String, default: '' },
     s3FileLink: { type: String, default: '' },
     presignedUrl: { type: String, default: '' },
     macAddress: { type: String, default: '' },
     ipAddress: { type: String, default: '' },
     createdAt: { type: String, default: '' },
 });
 
 
 var Inputs = module.exports = mongoose.model('Input', inputSchema);
 
 module.exports.get = function (callback, limit) {
    Inputs.find(callback).limit(limit);
}