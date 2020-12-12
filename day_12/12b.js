console.log('hello advent! 12 b');

const fs = require('fs');

const rawinst = fs.readFileSync('12.txt', 'utf8').split('\n');
const height = rawinst.length;

const instructions = rawinst.map(str => ({ dir: str[0], steps: parseInt(str.slice(1)) }));

console.log(instructions);

function turn(way, dir, amount) {
    const multiple = (dir === 'R'? amount / 90 : amount / -90) + 400;
    //+ 400 gives us a lot of space to deal with negative turns
    const turns = (multiple) % 4;
    let new_waypoint = null;
    switch (turns) {
        case 1:
            new_waypoint = [ way[1], -way[0] ];
            break;
        case 2:
            new_waypoint = [ -way[0], -way[1] ];
            break;
        case 3:
            new_waypoint = [ -way[1], way[0] ];
            break;
        default: //0
            new_waypoint = way;
            break;
    }
    console.log('turn\t:', dir, 'degrees:', amount, 'old way:', way, 'new way:', new_waypoint);
    return new_waypoint;
}

function advance(way, curr_pos, steps) {
    const next = [ curr_pos[0] + way[0] * steps, curr_pos[1] + way[1] * steps];
    console.log('advance\t: steps x', steps, 'towards', way, 'from', curr_pos, '=', next);
    return next;
}

let current = 'E';
let pos = [0,0];
let waypoint = [10, 1];

function add(way, dir, steps) {
    let result = null;
    switch (dir) {
        case 'N':
            result = [ way[0], way[1] + steps ];
            break;
        case 'E':
            result = [ way[0] + steps, way[1] ];
            break;
        case 'S':
            result = [ way[0], way[1] - steps ];
            break;
        case 'W':
            result = [ way[0] - steps, way[1] ];
            break;
    }
    console.log('add\t: waypoint', way, 'dir:', dir, 'steps:', steps, '=', result);
    return result;
}

for (const inst of instructions) {
    if (inst.dir === 'L' || inst.dir === 'R') {
        waypoint = turn(waypoint, inst.dir, inst.steps);
    } else if (inst.dir === 'F') {
        pos = advance(waypoint, pos, inst.steps);
    } else {//add
        waypoint = add(waypoint, inst.dir, inst.steps);
    }
}

console.log(pos, waypoint);

console.log('answer:', Math.abs(pos[0]) + Math.abs(pos[1]));
//answer: 12385