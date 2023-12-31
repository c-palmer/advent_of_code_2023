const fs = require('fs');
const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const findReflection = (grid) => {
    const numRows = grid.length;

    for (let i = 0; i < numRows - 1; i++) {
        let firstRow = i;
        let secondRow = i + 1;

        if (grid[firstRow] !== grid[secondRow]) continue;

        while (true) {
            firstRow--;
            secondRow++;

            if (firstRow == -1 || secondRow == numRows) return i + 1;
            if (grid[firstRow] !== grid[secondRow]) break;
        }
    }

    return null;
}

const transpose = (grid) => {
    const transpose = [];
    const width = grid[0].length;

    for (let i = 0; i < width; i++) {
        let newRow = []

        for (const row of grid)
            newRow.push(row[i]);

        transpose.push(newRow.join(''));
    }

    return transpose;
}

const grids = input
    .split('\n\n')
    .map((grid) => grid.split('\n').filter((str) => str.length != 0))
    .map((grid) => {
        let num = findReflection(grid);

        if (num != null) return 100 * num;

        return findReflection(transpose(grid));
    })
    .reduce((acc, num) => acc + num, 0);

console.log(util.inspect(grids, false, null, true));