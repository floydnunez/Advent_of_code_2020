console.log('hello advent! 05 a');

const fs = require('fs');

const allPasses = fs.readFileSync('05a.txt', 'utf8');
const passes = allPasses.split('\n');

function getPos(pp) {
    let xx = 0, yy = 0;
    if (pp[0] === 'B') xx += 64;
    if (pp[1] === 'B') xx += 32;
    if (pp[2] === 'B') xx += 16;
    if (pp[3] === 'B') xx += 8;
    if (pp[4] === 'B') xx += 4;
    if (pp[5] === 'B') xx += 2;
    if (pp[6] === 'B') xx += 1;

    if (pp[7] === 'R') yy += 4;
    if (pp[8] === 'R') yy += 2;
    if (pp[9] === 'R') yy += 1;

    return { x: xx, y: yy , id: xx * 8 + yy };
}

//input check
console.log(getPos('BFFFBBFRRR'));
console.log(getPos('FFFBBBFRRR'));
console.log(getPos('BBFFBBFRLL'));

let maxid = 0;
for (let ii = 0; ii < passes.length; ii++) {
    let pass = passes[ii];
    let pos = getPos(pass);
    if (pos.id > maxid) {
        maxid = pos.id;
    }
}
console.log('max id = ', maxid);
//answer 855