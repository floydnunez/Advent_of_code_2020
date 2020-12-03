console.log('hello advent! 03 a');

const fs = require('fs');

const allTrees = fs.readFileSync('03a.txt', 'utf8');
const arrTrees = allTrees.split('\n');
const bottom = arrTrees.length;
const width = arrTrees[0].length;

console.log('bottom:', bottom, 'width:', width);

const start = { x: 0, y: 0 };

function slope(ini, slope_x, slope_y) {
    console.log('slope:', ini);
    return { x: (ini.x + slope_x) % width, y: ini.y + slope_y };
}

function descendHill(slope_x, slope_y) {
    var pos = 0;
    var trees = 0;
    var curr = start;
    while (pos < bottom) {
        curr = slope(curr, slope_x, slope_y);
        if (curr.y < bottom && arrTrees[curr.y][curr.x] === '#') {
            trees++;
        }
        pos = curr.y;
    }
    return trees;
}

var trees1 = descendHill(1, 1);
var trees2 = descendHill(3, 1);
var trees3 = descendHill(5, 1);
var trees4 = descendHill(7, 1);
var trees5 = descendHill(1, 2);

const total = trees1 * trees2 * trees3 * trees4 * trees5;
console.log('trees:', trees1, trees2, trees3, trees4, trees5, ' = ', total);
//answer: 3510149120