// things that got me stuck:
    // apparently eightwo and sevenine, etc translate to 82 and 79
    // instead of 8wo, 7ine, or eigh2, seve9 respectively

    // when a higher digit number came before a lower one it would be ignored

    // issues dealing with multiple instances of the same digit number in a string

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const wordToNum = {
    'one': 'one1one',
    'two': 'two2two',
    'three': 'three3three',
    'four': 'four4four',
    'five': 'five5five',
    'six': 'six6six',
    'seven': 'seven7seven',
    'eight': 'eight8eight',
    'nine': 'nine9nine',
};

let getDigitWords = (string) => {
    let digitWords = [];

    Object.keys(wordToNum).forEach((key) => {
        let index;
        let currentIndex = 0;
        
        while ((index = string.indexOf(key, currentIndex)) != -1) {
            digitWords.push({'index': index, 'key': key});
            currentIndex = index + 1;
        }
    });

    return digitWords.sort((a, b) => a.index - b.index);
};

let replaceDigitWords = (string) => {
    // get array of objects that contain the index of the occurrance of the digit word
    // and the digit word itself, sorted by index
    let digitWords = getDigitWords(string);

    if (digitWords.length == 0) return string;

    // replace first digit word with corresponding digit
    string = string.replace(
        RegExp(`${digitWords[0].key}`),
        wordToNum[digitWords[0].key]
    );
        
    if (digitWords.length == 1) return string;
    
    // replace last digit word with corresponding digit
    string = string.replace(
        RegExp(`${digitWords[digitWords.length - 1].key}`, 'g'),
        wordToNum[digitWords[digitWords.length - 1].key]
    );

    return string;
};

let res = input
    .split('\n')
    // // .map((string) => string.replace(/(\d).*(\d)/g, '$1$2'))
    // // .filter((string) => !/^\d.*\d$/.test(string))
    .map(replaceDigitWords)
    // // .map((string) => string.replace(/(\d).*(\d)/g, '$1$2'))
    // // .filter((string) => /one|two|three|four|five|six|seven|eight|nine/.test(string))
    // // .join('\n');
    .map((string) => string.replace(/\D/g, ''))
    .map((string) => string[0] + string[string.length - 1])
    // // // .filter(Boolean)
    .reduce((acc, string) => acc + parseInt(string), 0);

console.log(res);

// let res = [];

// input.split('\n').forEach((string) => {
//     res.push({string})
// });

// res.forEach((obj) => {
//     obj.replacement = replaceDigitWords(obj.string);
//     // obj.digitWords = getDigitWords(obj.original);
//     // obj.final = obj.replacement.replace(/(\d).*(\d)/g, '$1$2');
// })

// console.log(util.inspect(res, false, null, true));

// console.log(res
//     .map((obj) => obj.string)
//     .map((string) => string.replace(/\D/g, ''))
//     .map((string) => string[0] + string[string.length - 1])
//     .reduce((acc, string) => acc + parseInt(string), 0)
// );

// console.log(getDigitWords('sevenninethreefive4bgknpbnine'));
// console.log(getDigitWords('5seveneighteight'));
// console.log(replaceDigitWords('5seveneighteight'));
// console.log(replaceDigitWords('sevenninethreefive4bgknpbnine'));
// console.log(replaceDigitWords('eightwo'));