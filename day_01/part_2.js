const fs = require('fs');
// const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const wordToDigit = {
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

    Object.keys(wordToDigit).forEach((digitWord) => {
        const regex = new RegExp(`${digitWord}`, 'g');
        for (const match of str.matchAll(regex))
            tokens.push({ value: wordToDigit[match[0]], index: match.index });
    })

    for (const match of str.matchAll(/\d/g))
        tokens.push({ value: match[0], index: match.index });

    return tokens.sort((a, b) => a.index - b.index);
};

const res = input
    .split('\n')
    .map(tokenizeDigits)
    .map((digits) => digits[0].value + digits[digits.length - 1].value)
    .reduce((acc, calibration) => acc + parseInt(calibration), 0);

console.log(res);
// expected output: 53340