const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

let res = input
    .split('\n')
    .map((string) => string.replace(/\D/g, ''))
    .map((string) => string[0] + string[string.length - 1])
    .reduce((acc, string) => acc + parseInt(string), 0);

console.log(res);
// expected output: 52974