const fs = require('fs');
const path = require('path');
const pathThemplate = path.join(__dirname, 'template.html');
const pathStylesFrom = path.join(__dirname, '/styles/');
const pathStylesTo = path.join(__dirname, '/project-dist/style.css');
const pathDist = path.join(__dirname, '/project-dist/');
const pathAssetsFrom = path.join(__dirname, '/assets/');
const pathAssetsTo = path.join(__dirname, '/project-dist/assets');
const pathComponents = path.join(__dirname, '/components/');
const pathIndex = path.join(__dirname, '/project-dist/index.html');


function parsingComponentsToArray() {

    fs.readdir(pathComponents, { withFileTypes: true },
        (err, files) => {
            if (err)
                console.log(err);
            else {
                files.forEach(file => {
                    fs.stat(path.join(pathComponents, file.name), (error, stats) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            let arrName = file.name.split(".");
                            if (arrName[1] === 'html') {
                                fs.readFile(path.join(pathComponents, file.name), 'utf8', function (err, data) {
                                    str = str.replace("{{" + arrName[0] + "}}", data);
                                    fs.stat(pathIndex, function (err) {
                                        if (!err) {
                                            fs.truncate(pathIndex, err => {
                                                if (err) throw err; // не удалось очистить файл
                                                fs.writeFile(pathIndex, str, (err) => {
                                                    if (err) throw err;
                                                });
                                            });
                                        }
                                        else if (err.code === 'ENOENT') {
                                            fs.writeFile(pathIndex, str, (err) => {
                                                if (err) throw err;
                                            });
                                        }
                                    });
                                });
                            }
                        }
                    });
                })
            }
        })
}

function copyDir(pathFrom, pathTo) {
    fs.readdir(pathFrom, { withFileTypes: true },
        (err, files) => {
            files.forEach(file => {
                fs.stat(path.join(pathFrom, file.name), function (err, stats) {
                    if (!(stats.isFile())) {
                        fs.stat(path.join(pathTo, file.name), function (err) {
                            if (!err) {
                                copyDir(path.join(pathFrom, file.name), path.join(pathTo, file.name));

                            }
                            else if (err.code === 'ENOENT') {
                                fs.mkdir(path.join(pathTo, file.name), err => {
                                    if (err) throw err;
                                    console.log("Папка " + path.join(pathTo, file.name) +
                                        " успешно создана!");
                                    copyDir(path.join(pathFrom, file.name), path.join(pathTo, file.name));
                                });

                            }
                        });
                    }
                    else {
                        fs.copyFile(path.join(pathFrom, file.name), path.join(pathTo, file.name), err => {
                            if (err) throw err;
                            console.log("Файл " + file.name + " из папки " +
                                pathFrom + " копирован в папку " + pathTo);
                        });
                    }
                });

            })
        })
}

function copyStyles() {
    fs.readdir(pathStylesFrom, { withFileTypes: true },
        (err, files) => {
            if (err)
                console.log(err);
            else {
                fs.stat(pathStylesTo, function (err) {
                    if (!err) {
                        console.log("Директория style.css есть");
                        fs.truncate(pathStylesTo, err => {
                            if (err) throw err; // не удалось очистить файл
                            console.log("Файл style.css успешно очищен");
                        });
                    }
                });

                files.forEach(file => {
                    fs.stat(path.join(pathStylesFrom, file.name), (error, stats) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            let arrName = file.name.split(".");
                            if (arrName[1] === "css") {
                                let stream = new fs.ReadStream(path.join(pathStylesFrom, file.name), { encoding: 'utf-8' });
                                stream.on('data', chunk => fs.appendFile(pathStylesTo, chunk, (err) => {
                                    if (err) throw err;
                                    console.log("файл " + file.name + " добавлен в бандл!");
                                }));
                            }
                        }
                    });
                })
            }
        })

}

function creatProject() {

    copyDir(pathAssetsFrom, pathAssetsTo);
    copyStyles();
    parsingComponentsToArray();
}

let str = '';
let stream = new fs.ReadStream(pathThemplate, { encoding: 'utf-8' });

stream.on('data', chunk => str += chunk);
stream.on('end', () => {

    fs.stat(pathDist, function (err) {
        if (!err) {
            console.log("Папка есть");
            creatProject();
        }
        else if (err.code === 'ENOENT') {
            fs.mkdir(pathDist, err => {
                if (err) throw err;
                console.log("Папка " + pathDist +
                    " успешно создана!");
                fs.mkdir(pathAssetsTo, err => {
                    if (err) throw err;
                    console.log("Папка " + pathAssetsTo + " успешно создана!");
                    creatProject();
                });
            });
        }
    });
});
