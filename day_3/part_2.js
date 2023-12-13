const fs = require('fs');
const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const findAdjacentNumbers = (specialChar) => {
    const adjacentNumbers = [];
    
    for (let row = specialChar.row - 1; row <= specialChar.row + 1; row++) {
        for (let col = specialChar.col - 1; col <= specialChar.col + 1; col++) {
            if (!/\d/.test(grid[row][col])) continue;
            
            for (const number of numbers) {
                if ('adjacent' in number) continue;
                if (number.row != row) continue;
                if (col < number.col || col > number.col + number.value.length - 1) continue;

                adjacentNumbers.push(number);
                number.adjacent = true;
            }
        }
    }

    specialChar.adjacentNumbers = adjacentNumbers;
    return specialChar;
}

const tokenizeLine = (line, lineNr) => {
    const tokens = [];

    for (const match of line.matchAll(/\d+|[^\d\.]/g)) {
        const token = { value: match[0], row: lineNr, col: match.index };
        
        token.type = /\d/.test(match[0]) ? 'number' : 'special';

        tokens.push(token);
    }

    return tokens;
}

const grid = input
    .split('\n')
    .filter(Boolean);

const tokens = grid
    .map(tokenizeLine)
    .flat();

const specialChars = tokens
    .filter((token) => token.type == 'special');

const numbers = tokens
    .filter((token) => token.type == 'number');

const res = specialChars
    .map(findAdjacentNumbers)
    .filter((specialChar) => specialChar.value == '*' && specialChar.adjacentNumbers.length == 2)
    .map((specialChar) => specialChar.adjacentNumbers.reduce((acc, number) => acc * number.value, 1))
    .reduce((acc, ratio) => acc + ratio, 0);

console.log(util.inspect(res, false, null, true));