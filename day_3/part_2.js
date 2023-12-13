const fs = require('fs');
const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const findNumber = (numbers, row, col) => {
    let res;
    numbers.forEach((number) => {
        if (number.connected) return;

        if (number.position.row != row) return;

        if (col < number.position.col || (number.position.col + number.length) < col ) return;

        number.connected = true;

        res = number;
    });

    return res;
}

const tokenizeLine = (line, lineNum) => {
    const tokens = [];

    let match;

    // tokenize numbers
    let index = 0;
    while ((match = line.substring(index).match(/(?<!\d)\d+/)) != null) {
        tokens.push({
            type: 'number',
            value: parseInt(match[0]),
            position: { row: lineNum, col: index + match.index },
            length: match[0].length,
            connected: false
        });

        index += match['index'] + match[0].length;
    }

    // tokenize special characters
    index = 0;
    while ((match = line.substring(index).match(/[^\d\.]/)) != null) {

        tokens.push({
            type: 'special',
            value: match[0],
            position: { row: lineNum, col: index + match.index }
        });

        index += match['index'] + match[0].length;
    }

    return tokens;
}

const connectSpecialCharsToNums = (specialChar) => {
        // search adjacent squares for numbers
        specialChar.numbers = [];
        for (let row = specialChar.position.row - 1; row <= specialChar.position.row + 1; row++) {
            for (let col = specialChar.position.col - 1; col <= specialChar.position.col + 1; col++) {
                if (/\d/.test(grid[row][col])) {
                    // attach corresponding number to special character if it exists
                    let number = findNumber(numbers, row, col);

                    if (number != null)
                        specialChar.numbers.push(number);
                }
            }
        }

        return specialChar;
    }


const grid = input.split('\n');

const tokens = grid
    .map(tokenizeLine)
    .flat();

const specialChars = tokens
    .filter((token) => token.type == 'special');

const numbers = tokens
    .filter((token) => token.type == 'number');
    
const res = specialChars
    .map(connectSpecialCharsToNums)
    .filter((specialChar) => specialChar.value == '*' && specialChar.numbers.length == 2)
    .map((specialChar) => specialChar.numbers.reduce((acc, number) => acc * number.value, 1))
    .reduce((acc, num) => acc + num, 0);

console.log(util.inspect(res, false, null, true));