console.log('hello advent! 03 a');

const fs = require('fs');

const slope_x = 3;
const slope_y = 1;

const allTrees = fs.readFileSync('03a.txt', 'utf8');
const arrTrees = allTrees.split('\n');
const bottom = arrTrees.length;
const width = arrTrees[0].length;

console.log('bottom:', bottom, 'width:', width);

const start = { x: 0, y: 0 };

function slope(ini) {
    console.log('slope:', ini);
    return { x: (ini.x + slope_x) % width, y: ini.y + slope_y };
}

var pos = 0;
var trees = 0;
var curr = start;
while (pos < bottom) {
    curr = slope(curr);
    if (curr.y < bottom && arrTrees[curr.y][curr.x] === '#') {
        trees++;
    }
    pos = curr.y;
}

console.log('trees =', trees);
//answer 284