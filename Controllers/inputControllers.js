
Inputs = require('../models/inputs');

// Handle index actions
// -- For testing purposes only
exports.index = function (req, res) {
    Inputs.get(function (err, inputs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "Success",
            message: "Data retrieved successfully",
            data: inputs
        });
    });
};

exports.upload = function (req, res) {

    var shortLink = req.body.shortLink;
    var s3FileLink = req.body.s3FileLink;
    var macAddress = req.body.macAddress;
    var ipAddress = req.body.ipAddress;

    addToDB(shortLink, s3FileLink, macAddress, ipAddress);

    res.json({
        message: 'Upload Completed.',
        link: shortLink
    });
}

// Handle create inputs data actions
var addToDB = function addToDB(shortLink, s3FileLink, macAddress, ipAddress) {
    var today = new Date(Date.now());
    var formattedDate = today.toUTCString();

    var input = new Inputs();
    input.shortLink = shortLink? shortLink : input.shortLink;
    input.s3FileLink = s3FileLink? s3FileLink : input.s3FileLink;
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


