const fs = require('fs');
// const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const maxNumOfCubes = {
    'red': 12,
    'green': 13,
    'blue': 14
}

// parse color and number of each type of cube, return in the form of an object
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

// parse game number and turns and return object containing these values
// call parseCubes to get color and number of cube for each turn
const parseGame = (string) => {
    let gameNumber = string.split(':')[0].match(/\d+/)[0];
    gameNumber = parseInt(gameNumber);

    const turns = string
        .split(':')[1]
        .split(';')
        .map(parseCubes);

    return { gameNumber, turns };
};

// if any block in any turn of a game has a number larger than the max number, set res to false
const isPossibleGame = (game) => {
    let res = true;
    
    game.turns.forEach((turn) => {
        turn.forEach((block) => {
            if (block.num > maxNumOfCubes[block.color])
                res = false;
        })
    });

    return res;
}

// break each line of input into its own string
// parse each string into game object which contains organized information about each game
// isPossibleGame uses game object and max number of allowable cubes to determine whether the game is possible
// add up all of the possible game numbers
const res = input
    .split('\n')
    .map(parseGame)
    .filter(isPossibleGame)
    .reduce((acc, game) => acc + game.gameNumber, 0);

// console.log(util.inspect(res, false, null, true));
console.log(res);
// expected value: 2406