console.log('hello advent! 06 b');

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
    const group = groups[gindex];
    let unique = new Set();
    group[0].split('').forEach(elem => unique.add(elem));
    console.log('unique candidate: ', unique);
    for (let lindex = 1; lindex < group.length; lindex++) {
        const line = group[lindex];
        console.log('line:', line, unique);
        for (let elem of unique) {
            console.log('checking elem:', elem, 'not in', line, '==?', !line.includes(elem));
            if (!line.includes(elem)) {
                console.log('line', line, 'does not have', elem, 'so removing it');
                unique.delete(elem);
            }
        }
    }
    total += unique.size;
    console.log(group, unique, total);
}

console.log('total:', total);
//answer: 3398