const fs = require('fs');
const util = require('util');

const input = fs.readFileSync('test_input.txt', 'utf-8');

console.log(util.inspect(input, false, null, true));