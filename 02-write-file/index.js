const TEXT_HELLO="Привет друг! Введи текст для записи в файл:";
const TEXT_OK="Записали! Еще что-нибудь запишем? Введи еще текст:";
const TEXT_FINISH="Процесс окончен! До новых встреч!";
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let outp = fs.createWriteStream(path.join(__dirname, 'text.txt'));

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

});
console.log(TEXT_HELLO);
rl.prompt();
rl.on('line', (input) => {
    if (input != "exit") {
        fs.appendFile(path.join(__dirname, 'text.txt'), input, (err) => {
            if (err) throw err;
            console.log(TEXT_OK);
        });
    } else {
        rl.close();
    }
});
rl.on('close', () => console.log(TEXT_FINISH));



