console.log('hello advent! 13 b');

const fs = require('fs');

const rawnums = fs.readFileSync('13.txt', 'utf8').split('\n');

function lcm_two_numbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}

function gcd_two_numbers(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

function shortenLargeNumber(num, digits) {
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;

    for(var i=units.length-1; i>=0; i--) {
        decimal = Math.pow(1000, i+1);

        if(num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }

    return num;
}

const rawids = rawnums[1].split(',');
// const ids = rawnums[1].split(',').filter(n => n !== 'x').map(n => parseInt(n));


const data = [];
for (let ii = 0; ii < rawids.length; ii++) {
    const id = rawids[ii];
    if (id === 'x') {
        continue;
    }
    data.push({id: parseInt(id), diff: ii});
}

let multiple = 1;
for (const remainder of data) {
    multiple *= remainder.id;
}
console.log('multiple:', multiple);

for (const elem of data) {
    const x = elem.diff;
    elem.x = elem.id - x;
    elem.lcm = lcm_two_numbers(x, elem.id);
}
console.log(data);

let answers = 'ChineseRemainder[{';

const remainders = data.map( dd => dd.x ).join(',');
console.log(remainders);
answers += remainders + '},{';
const primes = data.map( dd => dd.id ).join(',');
answers += primes + '}]';
console.log(answers);
//paste the string answers on wolfram alpha
//answer: 840493039281088