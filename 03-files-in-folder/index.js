const fs = require('fs');
const path = require('path');
const pathControl = path.join(__dirname, '/secret-folder/');

fs.readdir(pathControl, { withFileTypes: true },
  (err, files) => {
    console.log("FILES:");
    if (err)
      console.log(err);

    files.forEach(file => {
      fs.stat(path.join(pathControl, file.name), (error, stats) => {
        if (error)
          console.log(error);

if(file.isFile()){
        let arrName = file.name.split(".");
        console.log(arrName[0] + " - " + arrName[1] +
          " - " + stats.size / 1000 + "kb");
}
      });
    })
  })