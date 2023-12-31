const fs = require('fs');
const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const simulate = (board, dir) => {
    while (true) {
        let modified = false;
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                let rockCell = { row, col };
                // let emptyCell = { row: row - 1, col };

                let emptyCell = {
                    north: { row: row - 1, col },
                    south: { row: row + 1, col },
                    east: { row, col: col + 1 },
                    west: { row, col: col - 1 }
                }

                if (emptyCell[dir].row === -1 || emptyCell[dir].row === board.length) continue;
                if (emptyCell[dir].col === -1 || emptyCell[dir].col === board[row].length) continue;

                if (board[rockCell.row][rockCell.col] !== 'O') continue;
                if (board[emptyCell[dir].row][emptyCell[dir].col] !== '.') continue;


                board[rockCell.row][rockCell.col] = '.';
                board[emptyCell[dir].row][emptyCell[dir].col] = 'O';

                modified = true;
            }
        }
        
        if (!modified) return;
    }
}

let board = input
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => line.split(''));

// console.log(board.map((line) => line.join('')).join('\n'))

for (let i = 0; i < 1000; i++) {
    // one cycle
    for (const dir of ['north', 'west', 'south', 'east'])
        simulate(board, dir);
}

const res = board
    .map((line) => line.join(''))
    .map((line) => line.replaceAll(/[^O]/g, ''))
    .map((line) => line.length)
    .reverse()
    .reduce((acc, val, index) => acc + (val * (index + 1)));

console.log(res)

// console.log();
// console.log(board.map((line) => line.join('')).join('\n'))

// const res = board
//     .map((line) => line.join(''))
//     .map((line) => )

// console.log(util.inspect(board, false, null, true));