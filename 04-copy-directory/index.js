const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, '/files/');
const pathFolderCopy = path.join(__dirname, '/files-copy/');


fs.stat(pathFolderCopy, function (err) {
    if (!err) {
        console.log("Папка " + pathFolderCopy + " существует, теперь будет удалена:");
        fs.readdir(pathFolderCopy, { withFileTypes: true },
            (err, files) => {
                files.forEach(file => {
                    fs.unlink(path.join(pathFolderCopy, file.name), err => {
                        if (err) throw err;
                        console.log("Файл " + file.name + " из папки " +
                            pathFolderCopy + " удален!");
                    });
                })

                fs.rmdir(pathFolderCopy, err => {
                    if (err) throw err; // не удалось удалить папку
                    console.log("Папка" + pathFolderCopy + " успешно удалена");
                });
            }
        );
    }
    else if (err.code === 'ENOENT') {

        fs.mkdir(pathFolderCopy, err => {
            if (err) throw err;
            console.log("Папка " + pathFolderCopy +
                " успешно создана!");
        });
        fs.readdir(pathFolder, { withFileTypes: true },
            (err, files) => {
                files.forEach(file => {
                    fs.copyFile(path.join(pathFolder, file.name), path.join(pathFolderCopy, file.name), err => {
                        if (err) throw err;
                        console.log("Файл " + file.name + " из папки " +
                            pathFolder + " копирован в папку " + pathFolderCopy);
                    });
                })
            })
    }
});
