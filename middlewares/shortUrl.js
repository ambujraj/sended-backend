const nanoid = require('nanoid/async');
const dbFunction = require('./DBFunction');
require('dotenv').config();

exports.shorten = async function (originalURL) {
    let slug = await nanoid(6);
    slug = slug.toLowerCase();
    dbFunction.insertShortUrl(slug, originalURL);  
    return slug;
}
