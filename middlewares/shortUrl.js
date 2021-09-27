const BitlyClient = require('bitly').BitlyClient;
require('dotenv').config();
const bitly = new BitlyClient(process.env.BITLY_ACCESS_TOKEN);


exports.shorten = async function (longUrl) {
    const res = await bitly.shorten(longUrl);
    return String(res.link);
}