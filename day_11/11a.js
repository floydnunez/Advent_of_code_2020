console.log('hello advent! 11 a');

const fs = require('fs');

const rawmap = fs.readFileSync('11.txt', 'utf8').split('\n');
const height = rawmap.length;
const width = rawmap[0].length;

const omap = [];
for (let ii = 0; ii < height; ii++) {
    omap.push(rawmap[ii].split(''));
}

console.log(width, 'x', height);

function getPos(map, x, y) {
    const h = omap.length;
    const w = omap[0].length;
    if (x < 0 || y < 0 || x >= w || y >= h) {
        return '.';
    }
    return map[y][x];
}

function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}

function occupied(map, x, y) {
    let count = 0;
    const adjacent = [getPos(map, x-1, y-1), getPos(map, x, y-1), getPos(map, x+1, y-1),
        getPos(map, x+1, y), getPos(map, x+1, y+1), getPos(map, x, y+1), getPos(map, x-1, y+1), getPos(map, x-1, y)];
    return adjacent;
}

function count_seats(adjacent) {
    let empty = 0, occupied = 0;
    for (const elem of adjacent) {
        if (elem === '.' || elem === 'L') {
            empty++;
        } else if (elem === '#') {
            occupied++;
        }
    }
    return { e: empty, o: occupied };
}

function apply_rule(count, elem) {
    if (elem === 'L' && count.o === 0) {
        return '#';
    }
    if (elem === '#' && count.o >= 4) {
        return 'L';
    }
    return elem;
}

function step(original) {
    const h = original.length;
    const w = original[0].length;
    let map = clone(original);
    for (let row = 0; row < h; row++) {
        for (let column = 0; column < w; column++) {
            const elem = original[row][column];
            const count = count_seats(occupied(original, column, row));
            const next = apply_rule(count, elem);
            map[row][column] = next;
        }
    }
    return map;
}

function print(map) {
    const h = map.length;
    let result = '';
    for (let ii = 0; ii < h; ii++) {
        result += map[ii].join('') + '\n';
    }
    return result;
}

console.log((occupied(omap, 1, 1)));
console.log(count_seats(occupied(omap, 1, 1)));
console.log(apply_rule(count_seats(occupied(omap, 1, 1)), 'L'));

let map = omap;

function equals(oldmap, map) {
    const h = oldmap.length;
    const w = oldmap[0].length;
    for (let row = 0; row < h; row++) {
        for (let column = 0; column < w; column++) {
            if (oldmap[row][column] !== map[row][column]) {
                return false;
            }
        }
    }
    return true;
}

function count_occupied(map) {
    const h = map.length;
    const w = map[0].length;
    let result = 0;
    for (let row = 0; row < h; row++) {
        for (let column = 0; column < w; column++) {
            if ('#' === map[row][column]) {
                result++;
            }
        }
    }
    return result;
}

let stable = false;
let steps = 0;
for (steps = 0; steps < 100; steps++) {
    let oldmap = clone(map);
    console.log(print(map));
    map = step(map);
    if (equals(oldmap, map)) {
        console.log('STABLE MAP!\n');
        stable = true;
        break;
    }
}
console.log(print(map));
console.log('stable?', stable, 'at', steps);
console.log('occupied?', count_occupied(map));