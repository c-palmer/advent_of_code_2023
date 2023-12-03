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

const findMinCubes = (game) => {
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

    game.minCubes = maxValues;

    return game;
};

const findGamePower = (game) => {
    game.power = Object
        .values(game.minCubes)
        .reduce((acc, num) => acc * num, 1)

    return game;
};

const res = input
    .split('\n')
    .map(parseGame)
    .map(findMinCubes)
    .map(findGamePower)
    // .reduce((acc, game) => acc + game.power, 0);

console.log(util.inspect(res, false, null, true));
// console.log(res);
// expected value: 78375