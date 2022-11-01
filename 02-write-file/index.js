console.log("Start");

const fs = require('fs');
const path = require('path');
const readline = require('readline');
let outp = fs.createWriteStream(path.join(__dirname, 'text.txt'));

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

});
console.log("Привет друг! Введи текст для записи в файл:")
rl.prompt();
rl.on('line', (input) => {
    if (input != "exit") {
        fs.appendFile(path.join(__dirname, 'text.txt'), input, (err) => {
            if (err) throw err;
            console.log('Записали! Еще что-нибудь запишем? Введи еще текст:');
        });
    } else {
        rl.close();
    }
});
rl.on('close', () => console.log("Процесс окончен! До новых встреч!"));



