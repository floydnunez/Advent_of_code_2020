console.log('hello advent! 10 b');

const fs = require('fs');
//comment
const preamble = 5;
const joltages = fs.readFileSync('10.e2.txt', 'utf8').split('\n').map(n => parseInt(n));
joltages.push(0);
joltages.sort((n,m)=> n - m );
const max_joltage = joltages[joltages.length - 1] + 3;
joltages.push(max_joltage);
console.log(joltages);

let last_3 = false;
let last = -1, diff3 = 0, diff2 = 0, diff1 = 0;
let consolidated = [];
let current = '';
for (const jj of joltages) {
    if (last < 0) {
        consolidated.push(jj);
        last = jj;
        continue;
    }
    if (last >= 0) {
        if (jj - last === 1) {
            diff1++;
            consolidated.push(jj);
            last = jj;
            continue;
        } else if (jj - last === 2) {
            diff2++;
            consolidated.push(jj);
            last = jj;
            continue;
        } else if (jj - last === 3) {
            if (last_3) {
                console.log('2 consecutive diff3!', jj, last);
                let before = consolidated.pop();
                consolidated.push(before + '-' + jj);
                last_3 = true;
                diff3++;
            } else {
                last_3 = true;
                diff3++;
                consolidated.pop();
                consolidated.push(last + '-' + jj);
            }
            last = jj;
            continue;
        } else {
            consolidated.push(jj);
            last = jj;
            last_3 = false;
            continue;
        }
    }
}
let guiones = 0;
for (const elem of consolidated) {
    if (String(elem).includes('-')) {
        guiones++;
    }
}
console.log('length:', joltages.length, 'guiones:', guiones, 'd3:', diff3, 'd2:', diff2, 'd1:', diff1);
console.log(consolidated);
console.log('consolidated.length', consolidated.length);
//answer: 1836


