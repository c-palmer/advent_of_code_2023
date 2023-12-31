const fs = require('fs');
const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const energize = (grid) => {
    for (let j = 0; j < 500; j++) {
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                let curCell = grid[row][col];
                if (!curCell.energized) continue;

                switch (curCell.char) {
                    case '|':
                        if (curCell.dirs.north && row !== 0) {
                            grid[row - 1][col].energized = true;
                            grid[row - 1][col].dirs.north = true;
                        }

                        if (curCell.dirs.east || curCell.dirs.west) {
                            if (row !== 0) {
                                grid[row - 1][col].energized = true;
                                grid[row - 1][col].dirs.north = true;
                            }

                            if (row !== height - 1) {
                                grid[row + 1][col].energized = true;
                                grid[row + 1][col].dirs.south = true;
                            }
                        }

                        if (curCell.dirs.south && row !== height - 1) {
                            grid[row + 1][col].energized = true;
                            grid[row + 1][col].dirs.south = true;
                        }

                        break;

                    case '-':
                        if (curCell.dirs.north || curCell.dirs.south) {
                            if (col !== 0) {
                                grid[row][col - 1].energized = true;
                                grid[row][col - 1].dirs.west = true;
                            }

                            if (col != width - 1) {
                                grid[row][col + 1].energized = true;
                                grid[row][col + 1].dirs.east = true;
                            }
                        }

                        if (curCell.dirs.east && col !== width - 1) {
                            grid[row][col + 1].energized = true;
                            grid[row][col + 1].dirs.east = true;
                        }

                        if (curCell.dirs.west && col !== 0) {
                            grid[row][col - 1].energized = true;
                            grid[row][col - 1].dirs.west = true;
                        }

                        break;

                    case 'T':
                        if (curCell.dirs.north && col !== 0) {
                            grid[row][col - 1].energized = true;
                            grid[row][col - 1].dirs.west = true;
                        }

                        if (curCell.dirs.east && row !== height - 1) {
                            grid[row + 1][col].energized = true;
                            grid[row + 1][col].dirs.south = true;
                        }

                        if (curCell.dirs.south && col !== width - 1) {
                            grid[row][col + 1].energized = true;
                            grid[row][col + 1].dirs.east = true;
                        }

                        if (curCell.dirs.west && row !== 0) {
                            grid[row - 1][col].energized = true;
                            grid[row - 1][col].dirs.north = true;
                        }

                        break;

                    case '/':
                        if (curCell.dirs.north && col !== width - 1) {
                            grid[row][col + 1].energized = true;
                            grid[row][col + 1].dirs.east = true;
                        }

                        if (curCell.dirs.east && row !== 0) {
                            grid[row - 1][col].energized = true;
                            grid[row - 1][col].dirs.north = true;
                        }

                        if (curCell.dirs.south && col !== 0) {
                            grid[row][col - 1].energized = true;
                            grid[row][col - 1].dirs.west = true;
                        }

                        if (curCell.dirs.west && row !== height - 1) {
                            grid[row + 1][col].energized = true;
                            grid[row + 1][col].dirs.south = true;
                        }

                        break;
                    
                    case '.':
                        if (curCell.dirs.north && row !== 0) {
                            grid[row - 1][col].energized = true;
                            grid[row - 1][col].dirs.north = true;
                        }

                        if (curCell.dirs.east && col !== width - 1) {
                            grid[row][col + 1].energized = true;
                            grid[row][col + 1].dirs.east = true;
                        }

                        if (curCell.dirs.south && row !== height - 1) {
                            grid[row + 1][col].energized = true;
                            grid[row + 1][col].dirs.south = true;
                        }

                        if (curCell.dirs.west && col !== 0) {
                            grid[row][col - 1].energized = true;
                            grid[row][col - 1].dirs.west = true;
                        }

                        break;
                }
            }
        }
    }

    return grid
        .map((row) => row.map((cell) => cell.energized ? '#' : '').join('').length)
        .reduce((acc, num) => acc + num, 0);
}

const grid = input
    .replaceAll(/\\/g, 'T')
    .split('\n')
    .filter((row) => row.length > 0)
    .map((row) => row.split('').map((char) => {return { char, energized: false, dirs: { north: false, south: false, east: false, west: false } }}))

let height = grid.length;
let width = grid[0].length;

const results = [];

// top row
for (let col = 0; col < width; col++) {
    grid[0][col].energized = true;
    grid[0][col].dirs.south = true;

    results.push(energize(grid))

    grid
        .map((row) => {
            return row
                .map((cell) => {
                    cell.energized = false;
                    cell.dirs.north = false;
                    cell.dirs.south = false;
                    cell.dirs.east = false;
                    cell.dirs.west = false;
                })
        })
}

// bottom row
for (let col = 0; col < width; col++) {
    grid[height - 1][col].energized = true;
    grid[height - 1][col].dirs.north = true;

    results.push(energize(grid))

    grid
        .map((row) => {
            return row
                .map((cell) => {
                    cell.energized = false;
                    cell.dirs.north = false;
                    cell.dirs.south = false;
                    cell.dirs.east = false;
                    cell.dirs.west = false;
                })
        })
}

// left col
for (let row = 0; row < height; row++) {
    grid[row][0].energized = true;
    grid[row][0].dirs.east = true;

    results.push(energize(grid))

    grid
        .map((row) => {
            return row
                .map((cell) => {
                    cell.energized = false;
                    cell.dirs.north = false;
                    cell.dirs.south = false;
                    cell.dirs.east = false;
                    cell.dirs.west = false;
                })
        })
}

// right col
for (let row = 0; row < height; row++) {
    grid[row][width - 1].energized = true;
    grid[row][width - 1].dirs.west = true;

    results.push(energize(grid))

    grid
        .map((row) => {
            return row
                .map((cell) => {
                    cell.energized = false;
                    cell.dirs.north = false;
                    cell.dirs.south = false;
                    cell.dirs.east = false;
                    cell.dirs.west = false;
                })
        })
}

console.log(results.sort((a, b) => parseInt(b) - parseInt(a)));

// console.log(util.inspect(res, false, null, true));
// console.log(res)