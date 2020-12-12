console.log('hello advent! 12 a');

const fs = require('fs');

const rawinst = fs.readFileSync('12.txt', 'utf8').split('\n');
const height = rawinst.length;

const instructions = rawinst.map(str => ({ dir: str[0], steps: parseInt(str.slice(1)) }));

console.log(instructions);

const directions = ['E', 'S', 'W', 'N'];
const adds = [1, -1, -1, 1];

function turn(curr, dir, amount) {
    const current_index = directions.indexOf(curr);
    const multiple = (dir === 'R'? amount / 90 : amount / -90) + 400;
    //+ 400 gives us a lot of space to deal with negative turns
    return directions[(current_index + multiple) % directions.length];
}

function advance(curr_pos, dir, steps) {
    if (dir === 'E') {
        curr_pos[0] += steps;
    }
    if (dir === 'S') {
        curr_pos[1] -= steps;
    }
    if (dir === 'W') {
        curr_pos[0] -= steps;
    }
    if (dir === 'N') {
        curr_pos[1] += steps;
    }
    return curr_pos;
}

let current = 'E';
let pos = [0,0];

for (const inst of instructions) {
    if (inst.dir === 'L' || inst.dir === 'R') {
        current = turn(current, inst.dir, inst.steps);
    } else if (inst.dir === 'F') {
        pos = advance(pos, current, inst.steps);
    } else {
        pos = advance(pos, inst.dir, inst.steps);
    }
}

console.log(pos);

console.log('answer:', Math.abs(pos[0]) + Math.abs(pos[1]));
//answer 439