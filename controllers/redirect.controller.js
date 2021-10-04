const dbFunction = require('../middlewares/dbfunction');
const logger = require('../services/logger');
require('dotenv').config();


exports.redirect = async(req, res) => {
    const slug = req.params.slug;
    const originalURL = await dbFunction.getOriginalURL(String(slug));
    if(originalURL!=null){
        let count = await dbFunction.updateHit(String(slug));
        logger.log('info', "[redirect.controller] Slug Called("+count+" times): "+slug, {tags: 'redirect.controller,called'});
        res.redirect(originalURL);
    }
    else{
        res.status(404).json({message: "URL not found."});
    }
}