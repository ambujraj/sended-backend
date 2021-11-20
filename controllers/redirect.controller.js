const dbFunction = require('../middlewares/dbfunction');
const logger = require('../services/logger');
const LRU = require('../services/cache');
require('dotenv').config();
const lruCache = new LRU(50);

exports.redirect = async(req, res) => {
    const slug = req.params.slug;
    const cachedOriginalURL = lruCache.read(slug);
    let originalURL;
    if(cachedOriginalURL!=null){
        originalURL = cachedOriginalURL;
    }
    else{
        originalURL = await dbFunction.getOriginalURL(slug);
    }
    if(originalURL!=null){
        if(cachedOriginalURL==null){
            lruCache.write(slug, originalURL);
        }
        let count = await dbFunction.updateHit(String(slug));
        logger.log('info', "[redirect.controller] Slug Called("+count+" times): "+slug, {tags: 'redirect.controller,called'});
        res.redirect(originalURL);
    }
    else{
        res.status(404).json({message: "URL not found."});
    }
}