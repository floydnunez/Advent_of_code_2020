console.log('hello advent! 06 a');

const fs = require('fs');

const allAnswers = fs.readFileSync('06a.txt', 'utf8');
const rawanswers = allAnswers.split('\n');

const groups = [];
let subgroup = [];
for (let ii = 0; ii < rawanswers.length; ii++) {
    let answer = rawanswers[ii];
    if (answer === '') {
        groups.push(subgroup);
        subgroup = [];
        continue;
    }
    subgroup.push(answer);
}
groups.push(subgroup); //last one

let total = 0;
for (let gindex = 0; gindex < groups.length; gindex++) {
    const sub = groups[gindex];
    const unique = [];
    for (let lindex = 0; lindex < sub.length; lindex++) {
        const line = sub[lindex];
        for (let cindex = 0; cindex < line.length; cindex++) {
            let letter = line[cindex];
            if (!unique.includes(letter)) {//turns out you can delete an element while iterating over the set!
                unique.push(letter);
                total++;
            }
        }
    }
    console.log(sub, unique, total);
}

console.log('total:', total);
//answer: 6947