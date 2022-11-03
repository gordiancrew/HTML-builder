const fs = require('fs');
const path = require('path');
const pathControl = path.join(__dirname, '/styles/');
const pathBundle = path.join(__dirname, '/project-dist/bundle.css');


fs.readdir(pathControl, { withFileTypes: true },
    (err, files) => {
        console.log("FILES:");
        if (err)
            console.log(err);
        else {
            fs.stat(pathBundle, function (err) {
                if (!err) {
                    console.log("Директория есть");
                    fs.truncate(pathBundle, err => {
                        if (err) throw err; // не удалось очистить файл
                        console.log("Файл успешно очищен");
                    });
                }
            });

            files.forEach(file => {
                fs.stat(path.join(pathControl, file.name), (error, stats) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        let arrName = file.name.split(".");
                        if (arrName[1] === "css") {
                            let stream = new fs.ReadStream(path.join(pathControl, file.name), { encoding: 'utf-8' });
                            stream.on('data', chunk => fs.appendFile(pathBundle, chunk, (err) => {
                                if (err) throw err;
                                console.log("файл " + file.name + " добавлен в бандл!");
                            }));
                        }
                    }
                });
            })
        }
    })