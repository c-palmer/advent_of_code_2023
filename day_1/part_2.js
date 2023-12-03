const fs = require('fs');
// const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const wordToNum = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
};

const parseDigits = (string) => {
    const digits = [];

    // find all digit words, save corresponding digit and index in digits array
    Object.keys(wordToNum).forEach((key) => {
        let index;
        let currentIndex = 0;
        
        while ((index = string.indexOf(key, currentIndex)) != -1) {
            digits.push({'index': index, 'digit': wordToNum[key]});
            currentIndex = index + 1;
        }
    });

    // find all digits, save that digit and its index in digits array
    Object.values(wordToNum).forEach((digit) => {
        let index;
        let currentIndex = 0;
        
        while ((index = string.indexOf(digit, currentIndex)) != -1) {
            digits.push({'index': index, 'digit': digit});
            currentIndex = index + 1;
        }
    });

    return digits.sort((a, b) => a.index - b.index);
};

// read input
// break up input such that every line is its own string
// find all occurrences of the numbers 0-9, save them and their indices to an array
// find all occurrences of those numbers' english words, save their corresponding digits and indices to same array
// sort array in order of ascending index
// create string by concatenating first and last digits in array
// convert string to int
// sum up all ints
const res = input
    .split('\n')
    .map((string) => parseDigits(string))
    .map((arr) => arr[0].digit + arr[arr.length - 1].digit)
    .reduce((acc, string) => acc + parseInt(string), 0);

console.log(res);

// // debug
// const res = [];
// input.split('\n').forEach((string) => res.push({string}));
// res.forEach((obj) => obj.digits = parseDigits(obj.string));
// console.log(util.inspect(res, false, null, true));