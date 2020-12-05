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
        passports[passtotal] = current_pass + ' ';
        passtotal++;
        current_pass = '';
    } else {
        current_pass += line + ' ';
    }
    console.log(line);
}
//gotta handle the last lines
passports[passtotal] = current_pass + ' ';
passtotal++;

console.log('passports:', passports);
console.log('all_passports.length:', all_passports.length);
console.log('passports.length', passports.length);
console.log(passports[passtotal-1]);

function valid_pass(p) {
    if (p.includes('byr:') && p.includes('iyr:') && p.includes('eyr:') &&
        p.includes('hgt:') && p.includes('hcl:') && p.includes('ecl:') &&
        p.includes('pid:')) {  //&& p.includes('cid:')
        return true;
    }
    return false;
}

function check_height(hgt) {
    let ins = /(\d+)in/.exec(hgt);
    let cms = /(\d+)cm/.exec(hgt);
    if (ins) {
        let insi = parseInt(ins[1]);
        if (insi >= 59 && insi <= 76) {
            return true;
        }
    }
    if (cms) {
        let cmsi = parseInt(cms[1]);
        if (cmsi >= 150 && cmsi <= 193) {
            return true;
        }
    }
    return false;
}

function check_hcl(hcl) {
    let cl = /#[0-9a-f]{6}/.exec(hcl);
    if (!cl) {
        return false;
    }
    return true;
}

const eye_colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
function check_ecl(ecl) {
    if (eye_colors.includes(ecl)) {
        return true;
    }
    return false;
}

function check_pid(pid) {
    let pidn = /([0-9]{9}$)/.exec(pid);
    if (!pidn) {
        return false;
    }
    if (pid.length !== 9) {
        return false;
    }
    return true;
}

const values = [];
const valuesStr = [];

function double_valid(p) {
    const byr = parseInt(/byr:(\S+) /.exec(p)[1]);
    const iyr = parseInt(/iyr:(\S+) /.exec(p)[1]);
    const eyr = parseInt(/eyr:(\S+) /.exec(p)[1]);
    const hgt = /hgt:(\S+) /.exec(p)[1];
    const hcl = /hcl:(\S+) /.exec(p)[1];
    const ecl = /ecl:(\S+) /.exec(p)[1];
    const pid = /pid:(\S+) /.exec(p)[1];
    if (byr >= 1920 && byr <= 2002) {
        console.log('byr right', byr, 'next, iyr:', iyr);
        if (iyr >= 2010 && iyr <= 2020) {
            console.log('iyr right', iyr, 'next, eyr:', eyr);
            if (eyr >= 2020 && eyr <= 2030) {
                console.log('all years valid for:', p);
                if (check_height(hgt)){
                    console.log('height good:', p);
                  if (check_hcl(hcl)) {
                      console.log('hair color good:', p);
                      if (check_ecl(ecl)) {
                          console.log('eye color good:', p);
                          if (check_pid(pid)) {
                              console.log('pid good:', p);
                              valuesStr.push('byr: ' + byr + ' iyr: ' + iyr + ' eyr: ' + eyr
                                  + ' hgt: ' + hgt + ' hcl: ' + hcl + ' ecl: ' + ecl + ' pid: ' + pid.length);
                              values.push({byr: byr, iyr: iyr, eyr: eyr, hgt: hgt, hcl: hcl, ecl: ecl, pid: pid});
                              return true;
                          }
                      }
                  }
                }
            }
        }
    }
    return false;
}

let valids = 0;
let double_valids = 0;

const dvps = [];
for (let index = 0; index < passtotal; index++) {
    const pass = passports[index];
    if (valid_pass(pass)) {
        if (double_valid(pass)) {
            dvps.push(pass);
            double_valids++;
        }
        valids++;
    }
}
console.log('total valid passports : ',valids);
console.log('double valid passports: ',double_valids);
for (let index = 0; index < double_valids; index++) {
    console.log(dvps[index]);
    console.log('----> ' + valuesStr[index]);
}
console.log('total valid passports : ',valids);
console.log('double valid passports: ',double_valids);
//89 WRONG
//104 WRONG too high
//answer: 103
