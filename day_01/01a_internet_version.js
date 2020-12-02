console.log('hello advent! 01 a');

const fs = require('fs');

const all_numbers = fs.readFileSync('01a.txt', 'utf8');

console.log(typeof all_numbers);

const data = all_numbers.split('\n');

const inputs = data.map(n => parseInt(n, 10));
console.log('inputs: ', inputs)
// algorithm *-*
let our2020 = inputs.filter(n => n + inputs.find(k => k+n === 2020) === 2020);
console.log('our2020', our2020)
console.log("Solution:", our2020[0] * our2020[1]);
// https://www.reddit.com/r/adventofcode/comments/k4e4lm/2020_day_1_solutions/gecbbcr/?utm_source=reddit&utm_medium=web2x&context=3


//solution:  692916, which is 438 * 1582
