console.log("Start");

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    promt: '>'

});
console.log("Hello my frient! Enter your text:")
rl.prompt();
rl.on('line', (input) => {
    if (input != "exit") {


        fs.appendFile(path.join(__dirname, 'text.txt'), input, (err) => {
            if (err) throw err;
            console.log('Data has been added!');
        });
    }
    rl.close();
    console.log("Good buy!!");
});



