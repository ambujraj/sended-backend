// var fs = require('fs');
// var archiver = require('archiver');


// exports.zipFiles = function(zipFileName, multerCheckReturnValue, folderName) {
//     var output = fs.createWriteStream(zipFileName);
//     var archive = archiver('zip', {
//         gzip: true,
//         zlib: { level: 5 } // Sets the compression level.
//     });
    
//     archive.on('error', function(err) {
//       throw err;
//     });
    
//     // pipe archive data to the output file
//     archive.pipe(output);
    
//     for (let item of multerCheckReturnValue) {
        
//         archive.file(item.filePath, {name: item.name});
//     }
    
//     // finalize
//     archive.finalize();

//     return output;

// }

const path = require("path");
 
const express = require("express");
const zipper = require("multer-zip");
const multer = require("multer");
const upload = multer(/* ... multer opts ... */);
const app = express();
 
// ... app definitions
 
exports.zip = (req, res) => {
    const { files } = req;
    const dest = path.join(__dirname, "uploads");
    const zipname = `files_${Math.random()}.zip`;
    const filenamer = ({ originalname }) => `${new Date().getTime()}_${originalname}`; 
    zipper({ files, dest, zipname, filenamer })
        .then(() => {
            console.log("successfully zipped files");
        })
        .catch(error => {
            console.log(error);
        });
 
    console.log('zipping...');
};