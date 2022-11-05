const fs = require('fs');
const path = require('path');
const pathThemplate = path.join(__dirname, 'template.html');
const pathStylesFrom = path.join(__dirname, '/styles/');
const pathStylesTo = path.join(__dirname, '/project-dist/style.css');
const pathDist = path.join(__dirname, '/project-dist/');
const pathAssetsFrom = path.join(__dirname, '/assets/');
const pathAssetsTo = path.join(__dirname, '/project-dist/assets');
const pathComponents = path.join(__dirname, '/components/')


function parsingComponentsToArray() {
    let arr = [];
    arr.push({component:"ww",content:"eee"});


    fs.readdir(pathComponents, { withFileTypes: true },
        (err, files) => {
            console.log("FILES:");
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
                            console.log(arrName[0] + " - " + arrName[1] +
                                " - " + stats.size / 1000 + "kb");

                            if (arrName[1] === 'html') {

                               


                                fs.readFile(path.join(pathComponents, file.name), 'utf8', function(err, data){
      
                            

                                    arr.push({component:arrName[0],content:data});
                                    
                                }
                                
                                
                                );console.log("oooooooooooooooooooooooooooooooo"+arr);












                            }





                        }
                    });









                }
                
                
                
                )

                
            }
           
        })
        


}




function copyDir(pathFrom, pathTo) {
    fs.readdir(pathFrom, { withFileTypes: true },
        (err, files) => {
            files.forEach(file => {




                fs.stat(path.join(pathFrom, file.name), function (err, stats) {
                    if (!(stats.isFile())) {
                        console.log('это папка');
                        fs.mkdir(path.join(pathTo, file.name), err => {
                            if (err) throw err;
                            console.log("Папка " + path.join(pathTo, file.name) +
                                " успешно создана!");
                            copyDir(path.join(pathFrom, file.name), path.join(pathTo, file.name));
                        });






                    }
                    else {
                        console.log('это файл');


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
            console.log("FILES:");
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



fs.mkdir(pathDist, err => {
    if (err) throw err;
    console.log("Папка " + pathDist +
        " успешно создана!");
    fs.mkdir(pathAssetsTo, err => {
        if (err) throw err;
        console.log("Папка " + pathAssetsTo +
            " успешно создана!");


        copyDir(pathAssetsFrom, pathAssetsTo);
        copyStyles();
        parsingComponentsToArray();


    });

});














// let str = '';
// let stream = new fs.ReadStream(pathThemplate, { encoding: 'utf-8' });

// stream.on('data', chunk => str += chunk);
// stream.on('end', () => {
//     str = str.replace("{{header}}", "{{heheder}}");
//     console.log(str)
// });
