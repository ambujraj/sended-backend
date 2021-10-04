
const mongoose = require('mongoose');
 

// Shorten Schema 
const shortSchema = mongoose.Schema({
     original_url: { type: String, default: '', required: true },
     slug: { type: String, default: '', required: true },
     clicks: {type: Number, default: 0},
     created_at: { type: String, default: '' },
});
 
 
var Shorts = module.exports = mongoose.model('Short', shortSchema);