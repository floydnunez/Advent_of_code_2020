console.log('hello advent! 10 a');

const fs = require('fs');

const preamble = 5;
const joltages = fs.readFileSync('10a.txt', 'utf8').split('\n').map(n => parseInt(n));
joltages.sort((n,m)=> n - m );
console.log(joltages);

let last = -1, diff3 = 1, diff1 = 1;
for (const jj of joltages) {
    if (last > 0) {
        if (jj - last === 1) {
            diff1++;
        } else if (jj - last === 3) {
            diff3++;
        }
    }
    last = jj;
}
console.log(diff3, diff1, diff3 * diff1);

//answer: 1836


