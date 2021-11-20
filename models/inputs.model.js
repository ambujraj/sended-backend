
const mongoose = require('mongoose');
 

// Input Schema 
const inputSchema = mongoose.Schema({
     short_link: { type: String, default: '' },
     s3_file_link: { type: String, default: '' },
     presigned_url: { type: String, default: '' },
     ip_address: { type: String, default: '' },
     created_at: { type: String, default: '' },
});
 
 
 var Inputs = module.exports = mongoose.model('Input', inputSchema);
 
//  module.exports.get = function (callback, limit) {
//     Inputs.find(callback).limit(limit);
// }