const fs = require('fs');
const util = require('util');

const input = fs.readFileSync('input.txt', 'utf-8');

const hash = (str) => {
    let res = 0;

    str.split('').forEach((char) => {
        res += char.charCodeAt(0);
        res *= 17;
        res %= 256;
    })

    return res;
}

const tokenizeLenses = (input) => input
    .replaceAll('\n', '')
    .split(',')
    .map((seq) => { 
        let res = { seq };

        res.label = seq.match(/[a-zA-Z]+/)[0];
        res.hash = hash(res.label);

        if (/-/.test(seq)) {
            res.op = 'rm';
            res.focalLength = null;
        }
        else if (/=/.test(seq)) {
            res.op = 'add';
            res.focalLength = seq[seq.length - 1];
        }

        return res;
    })

const organizeLenses = (lenses, boxes) => lenses.forEach((lense) => {
    let existingLenseIndex = -1;
    let box = boxes[lense.hash];

    box.lenses.forEach((storedLense, i) => {
        if (storedLense.label !== lense.label) return;

        existingLenseIndex = i;
    })

    if (lense.op === 'add') {
        if (existingLenseIndex === -1) {
            box.lenses.push(lense);
            return;
        }

        box.lenses[existingLenseIndex] = lense;
        return;
    }

    if (lense.op === 'rm') {
        if (existingLenseIndex === -1) return;

        box.lenses.splice(existingLenseIndex, 1);
        return;
    }
});



const boxes = Array(256)
    .fill()
    .map((box, i) => { 
        return { boxNum: i, lenses: [] }
    });

const lenses = tokenizeLenses(input);

organizeLenses(lenses, boxes);

const res = boxes
    .filter((box) => box.lenses.length > 0)
    .map((box) => box.lenses.map((lense, i) => (i + 1) * lense.focalLength * (box.boxNum + 1)))
    .flat()
    .reduce((acc, num) => acc + num, 0);

console.log(util.inspect(res, false, null, true));