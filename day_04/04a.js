console.log('hello advent! 04 a');

const fs = require('fs');

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

const all_data = fs.readFileSync('04a.txt', 'utf8');
const all_passports = all_data.split('\n');
const length = all_passports.length;

passports = [];
let passtotal = 0;
let current_pass = '';
for (let index = 0; index < length; index++) {
    const line = all_passports[index];
    if (isBlank(line)) {
        passports[passtotal] = current_pass;
        passtotal++;
        current_pass = '';
    } else {
        current_pass += line;
    }
    console.log(line);
}
//gotta handle the last lines
passports[passtotal] = current_pass;
passtotal++;

console.log('passports:', passports);
console.log('all_passports.length:', all_passports.length);
console.log('passports.length', passports.length);
console.log(passports[passtotal-1]);
let valids = 0;

function valid_pass(p) {
    if (p.includes('byr:') && p.includes('iyr:') && p.includes('eyr:') &&
        p.includes('hgt:') && p.includes('hcl:') && p.includes('ecl:') &&
        p.includes('pid:')) {  //&& p.includes('cid:')
        return true;
    }
    return false;
}

for (let index = 0; index < passtotal; index++) {
    if (valid_pass(passports[index])) {
        valids++;
    }
}
console.log('total valid passports: ',valids);
//answer 170