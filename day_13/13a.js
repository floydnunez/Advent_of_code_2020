console.log('hello advent! 13 a');

const fs = require('fs');

const rawnums = fs.readFileSync('13.txt', 'utf8').split('\n');

const start = parseInt(rawnums[0]);
const ids = rawnums[1].split(',').filter(n => n !== 'x').map(n => parseInt(n));

console.log('start:', start, 'ids:', ids);

const remainders = ids.map(n => {
    const remainder = start % n;
    const divisor = (start - remainder) / n;
    const closest = (divisor + (remainder === 0? 0 : 1)) * n;
    const result = { id: n, remainder: remainder, divisor:  divisor, closest: closest };
    return result;
});

remainders.sort((m, n) => m.closest - n.closest);

console.log(remainders);

const answer = remainders[0].id * (remainders[0].closest - start);

console.log('answer:', answer);
//answer: 1895