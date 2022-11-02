const fs = require('fs');
const path = require('path');
const pathControl=path.join(__dirname,'/secret-folder/');

fs.readdir(pathControl, { withFileTypes: true },
    (err, files) => {
        console.log("\nCurrent files:");
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                // console.log( path.extname(file.name));




                fs.stat(path.join(pathControl,file.name), (error, stats) => {
                    if (error) {
                      console.log(error);
                    }
                    else {
                     
                      console.log("--"+file.name+"--"+stats.size)
                    
                      // Using methods of the Stats object
                      // console.log("Path is file:", stats.isFile());
                      // console.log("Path is directory:", stats.isDirectory());
                    }
                  });


            })
        }
    })