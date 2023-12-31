const fs = require('fs');
const util = require('util');

const input = fs.readFileSync('test_input.txt', 'utf-8');

const res = input
    .split('\n')
    .filter((row) => row.length > 0)
    .map((row) => row.split(/\.+| /).filter((section) => section.length > 0))
    .map((row) => )

console.log(util.inspect(res, false, null, true));

// length = 15
// ?#?#?#?#?#?#?#?
// length = 14
// #.###.#.######
// ###############
// .#.

// length = 13
// ?###?????????
// length = 8
// ###.##.#