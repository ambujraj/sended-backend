var fs = require('fs');
var archiver = require('archiver');


exports.zipFiles = function(zipFileName, multerCheckReturnValue, folderName) {
    var output = fs.createWriteStream(zipFileName);
    var archive = archiver('zip', {
        gzip: true,
        zlib: { level: 5 } // Sets the compression level.
    });
    
    archive.on('error', function(err) {
      throw err;
    });
    
    // pipe archive data to the output file
    archive.pipe(output);
    
    for (let item of multerCheckReturnValue) {
        const params = getParams(folderName, item);
        archive.file(item.filePath, {name: item.name});
    }
    
    // finalize
    archive.finalize();

    return output;

}
