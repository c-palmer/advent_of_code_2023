const fs = require('fs');
const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const findReflection = (grid) => {
    const numRows = grid.length;

    for (let i = 0; i < numRows - 1; i++) {
        let smudge = false;
        let firstRow = i;
        let secondRow = i + 1;

        if (grid[firstRow] !== grid[secondRow]) {
            if (smudge) continue;

            let differences = 0;
            for (let j = 0; j < grid[firstRow].length; j++)
                if (grid[firstRow][j] !== grid[secondRow][j])
                    differences++;

            if (differences > 1) continue;

            smudge = true;
        }

        while (true) {
            firstRow--;
            secondRow++;

            if (firstRow == -1 || secondRow == numRows) {
                if (smudge) return { value: i + 1, smudge };

                break;
            }
            
            if (grid[firstRow] === grid[secondRow]) continue;

            if (!smudge) {
                let differences = 0;
                for (let j = 0; j < grid[firstRow].length; j++)
                    if (grid[firstRow][j] !== grid[secondRow][j])
                        differences++;

                if (differences > 1) break;

                smudge = true;
                continue;
            }

            if (grid[firstRow] !== grid[secondRow]) break;
        }
    }

    return { value: null, smudge: false };
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
        let horizontal = findReflection(grid);
        let veritcal = findReflection(transpose(grid));

        if (horizontal.smudge) return 100 * horizontal.value;
        return veritcal.value;
    })
    .reduce((acc, num) => acc + num, 0);

console.log(util.inspect(grids, false, null, true));
// 17911 wrong

// grids.forEach((grid) => console.log(findReflection(grid), findReflection(transpose(grid))))

// let res = grids
//     .map((grid) => {
//         let horizontal = findReflection(grid);
//         let veritcal = findReflection(transpose(grid));

//         if (horizontal.smudge) return 100 * horizontal.value;
//         return veritcal.value;
//     })

// console.log(util.inspect(res, false, null, true));