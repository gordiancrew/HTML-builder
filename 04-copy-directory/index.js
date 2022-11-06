const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, '/files/');
const pathFolderCopy = path.join(__dirname, '/files-copy/');


function createAndCopyDir() {
    fs.mkdir(pathFolderCopy, err => {
        if (err) throw err;
        console.log("Папка " + pathFolderCopy +
            " успешно создана!");
        copyDir();
    });
}

function copyDir() {
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

function cleanAndCopyDir() {
    fs.readdir(pathFolderCopy, { withFileTypes: true },
        (err, files) => {
            files.forEach(file => {
                fs.unlink(path.join(pathFolderCopy, file.name), err => {
                    if (err) throw err;
                    console.log("Файл " + file.name + " из папки " +
                        pathFolderCopy + " удален!");
                });
            })
            copyDir();
        }
    );
}

fs.stat(pathFolderCopy, function (err) {
    if (!err) {
        console.log("Папка " + pathFolderCopy + " существует, теперь будет обновлена: ");
        cleanAndCopyDir();
    }
    else if (err.code === 'ENOENT') {
        console.log("Папка " + pathFolderCopy + " не существует, теперь будет создана и заполнена: ");
        createAndCopyDir();
    }
});
