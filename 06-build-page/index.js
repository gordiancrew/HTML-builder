const fs = require('fs');
const path = require('path');
const pathThemplate= path.join(__dirname, 'template.html');

let str='';
let stream=new fs.ReadStream(pathThemplate, {encoding: 'utf-8'});

stream.on('data', chunk => str+=chunk);

stream.on('end',()=>{
   
   
   str= str.replace("{{der}}","{{heheder}}");
    
    
    console.log(str)
});
