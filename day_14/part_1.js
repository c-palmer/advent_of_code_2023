const fs = require('fs');
const util = require('util');

const input = fs.readFileSync('test_input.txt', 'utf-8');

const roll = (grid, dir) => {
    const height = grid.length;
    const width = grid[0].length;

    const offset = {
        north: { row: -1, col: 0 },
        south: { row: 1, col: 0 },
        east: { row: 0, col: 1 },
        west: { row: 0, col: -1 }
    }

    while (true) {
        let edited = false;

        for (let row = 0; row < width; row++) {
            for (let col = 0; col < height; col++) {
                if (grid[row][col] !== 'O') continue;

                const check = { row: row + offset[dir].row, col: col + offset[dir].col }
                if (check.row == -1 || check.row == height) continue;
                if (check.col == -1 || check.col == width) continue;

                if (grid[check.row][check.col] != '.') continue;

                grid[row][col] = '.';
                grid[check.row][check.col] = 'O';

                edited = true;
            }
        }

        if (!edited) break;
    }

    return grid
}

let grid = input
    .split('\n')
    .filter((row) => row.length > 0)
    .map((row) => row.split(''));

const seen = [];
seen.push(grid.map((row) => row.join('')).join('\n'));

let i = 0;
let curGrid;
while (i < 30) {
    for (const dir of ['north', 'west', 'south', 'east'])
        roll(grid, dir);

    i++;

    curGrid = grid.map((row) => row.join('')).join('\n');

    if (seen.includes(curGrid)) break;

    seen.push(curGrid);
}

console.log(seen.indexOf(curGrid), i);
console.log(seen[seen.indexOf(curGrid)]);
console.log();
console.log(curGrid);
console.log(i - seen.indexOf(curGrid));

// const res = grid
//     .map((row) => row.join(''))
//     .map((row) => row.replaceAll(/[^O]/g, ''))
//     .map((row) => row.length)
//     .reduce((acc, num, i) => acc + (num * (grid.length - i)), 0);

// console.log(res)