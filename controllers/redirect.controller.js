const dbFunction = require('../middlewares/DBFunction');
const logger = require('../services/logger');
require('dotenv').config();


exports.redirect = async(req, res) => {
    const slug = req.params.slug;
    const originalURL = await dbFunction.getOriginalURL(String(slug));
    if(originalURL!=null){
        dbFunction.updateHit(slug);
        logger.log('info', "[redirect.controller] Slug Called: "+slug, {tags: 'redirect.controller,called'});
        res.redirect(originalURL);
    }
    else{
        res.status(404).json({message: "URL not found."});
    }
}