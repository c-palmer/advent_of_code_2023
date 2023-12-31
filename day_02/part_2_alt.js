const fs = require('fs');
const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const maxNumOfCubes = {
    'red': 12,
    'green': 13,
    'blue': 14
}

const parseCubes = (string) => {
    return string
        .split(',')
        .map((string) => {
            let num = string.match(/\d+/)[0];
            num = parseInt(num);

            const color = string.match(/red|green|blue/)[0];

            return { num, color };
        });
};

const parseGame = (string) => {
    let gameNumber = string.split(':')[0].match(/\d+/)[0];
    gameNumber = parseInt(gameNumber);

    const turns = string
        .split(':')[1]
        .split(';')
        .map(parseCubes);

    return { gameNumber, turns };
};

const getMinCubes = (game) => {
    const maxValues = {
        'red': 0,
        'green': 0,
        'blue': 0
    };

    game.turns.forEach((turn) => {
        turn.forEach((cubeType) => {
            if (cubeType.num > maxValues[cubeType.color])
                maxValues[cubeType.color] = cubeType.num;
        });
    });

    return maxValues;
};

const getPower = (minCubes) => {
    return Object
        .values(minCubes)
        .reduce((acc, num) => acc * num, 1)
};

const res = input
    .split('\n')
    .map(parseGame)
    .map(getMinCubes)
    .map(getPower)
    .reduce((acc, power) => acc + power, 0);

console.log(util.inspect(res, false, null, true));
// console.log(res);
// expected value: 78375