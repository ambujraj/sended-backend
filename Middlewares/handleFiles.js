

exports.handle = (file) => {
    let filePath;
    let fileName;
    let storage = [];

    switch(Array.isArray(file)){
        case true:
            input.foreach(element => {
                filePath = element.path;
                filename = element.originalname;
                storage.push({ filePath, filename });
            });
            break;
        case false:
            if (typeof file === 'string') {
                  filePath = element[0].path;
                  filename = element[0].originalname;
                  storage = { filePath, filename };
              }
        default:
            break;
    }

    return storage;
}