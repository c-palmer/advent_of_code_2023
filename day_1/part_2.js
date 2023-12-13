const fs = require('fs');
// const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const wordToNum = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
};

const tokenizeDigits = (str) => {
    const tokens = [];

    const tokenize = (token) => {
        let regex = new RegExp(`${token}`, 'g');
        let match;

        while ((match = regex.exec(str)) !== null) {
            if (/\d/.test(match))
                tokens.push({index: match.index, value: match[0]});
            else
                tokens.push({index: match.index, value: wordToNum[match[0]]});
        }
    }

    // tokenize all digit words
    Object.keys(wordToNum).forEach(tokenize);

    // tokenize each digit
    Object.values(wordToNum).forEach(tokenize);

    return tokens.sort((a, b) => a.index - b.index);
};

const res = input
    .split('\n')
    .map(tokenizeDigits)
    .map((digits) => digits[0].value + digits[digits.length - 1].value)
    .reduce((acc, calibration) => acc + parseInt(calibration), 0);

console.log(res);
// expected output: 53340