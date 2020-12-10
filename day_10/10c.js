console.log('hello advent! 10 b');

const fs = require('fs');
//comment
const preamble = 5;
const joltages = fs.readFileSync('10a.txt', 'utf8').split('\n').map(n => parseInt(n));
// joltages.push(0);
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
const reconsolidated = [];
let clast = '';
for (const elem of consolidated) {
    const selem = String(elem);
    if (selem.includes('-')) {
        if (clast.includes('-')) {
            reconsolidated.pop();
            reconsolidated.push(clast + '-' + selem);
            clast = selem;
            continue;
        }
    }
    reconsolidated.push(elem);
    clast = selem;
}
consolidated = reconsolidated;
let guiones = 0;
for (const elem of consolidated) {
    if (String(elem).includes('-')) {
        guiones++;
    }
}
console.log(consolidated);
const nums = consolidated.length - guiones;
console.log('length:', joltages.length, 'guiones:', guiones, 'd3:', diff3, 'd2:', diff2, 'd1:', diff1, 'nums:', nums);
console.log('consolidated.length', consolidated.length);

let singles = 0;
let sequence = [];
let last_num = false;
for (const elem of consolidated) {
    if (String(elem).includes('-')) {
        sequence.push('s');
        last_num = false;
        singles = 0;
    } else {
        singles++;
        if (last_num) {
            sequence.pop();
        }
        last_num = true;
        sequence.push(singles);
    }
}
console.log(sequence);
//1,2,3
//1,2
//1,3
//1
//2,3
//2
//3
//  ------> 7
//4-7
//8,9,10
//8,9
//8,10
//8
//9,10
//9
//10
//  ------> 7
//11-14-17
//18,19
//18
//19
// --
//  ------> 4
//20-23
//24
// --
//  ------> 2
//25-28-31
//32,33,34
//32,33
//32,34
//32
//33,34
//33
//34
//  ------> 7
//35-38-39-42-45
//46,47,48
//46,47
//46,48
//46
//47,48
//47
//48
//  ------> 7
//49-52

const removed = [];
for (let elem of sequence) {
    if (typeof elem === 'string' || elem instanceof String) {
        continue;
    }
    if (elem >= 3) {
        removed.push(7);
    } else if (elem === 2) {
        removed.push(4);
    } else if (elem === 1) {
        removed.push(2);
    }
}
console.log(removed);
let total = 1;
for (const elem of removed) {
    total *= elem;
}
console.log('total:', total);
//answer: 43406276662336