const Inputs = require('../models/inputs');


// Handle create inputs data actions
exports.addToDB = function addToDB(shortLink, s3FileLink, presignedUrl, macAddress, ipAddress) {
    var today = new Date(Date.now());
    var formattedDate = today.toUTCString();

    var input = new Inputs();
    input.shortLink = shortLink ? shortLink : input.shortLink;
    input.s3FileLink = s3FileLink ? s3FileLink : input.s3FileLink;
    input.presignedUrl = presignedUrl ? presignedUrl : input.presignedUrl;
    input.macAddress = macAddress ? macAddress : input.macAddress;
    input.ipAddress = ipAddress ? ipAddress : input.ipAddress;
    input.createdAt = formattedDate;

    input.save(function (err) {
        // if (err)
        //  res.json(err);
        // res.json({
        //     message: 'New Input Created!',
        //     data: input
        // });

        //temp code - to be replaced by log
        console.log('New Short Link: '+shortLink);
    });
};

