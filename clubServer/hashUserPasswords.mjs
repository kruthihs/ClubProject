import bcrypt from 'bcryptjs';
import { readFile, writeFile } from 'fs/promises';

const users = JSON.parse(await readFile('./clubUsers3.json',
'utf8'));

let nRounds = 12;
let hashedUsers = [];
let start = new Date(); // timing code
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);
let salt = bcrypt.genSaltSync(nRounds); // New salt everytime!
users.map(function (a) {
    let passHash = bcrypt.hashSync(a.password, salt);
    a.password = passHash;
    hashedUsers.push(a)
    return hashedUsers;
});

let elapsed = new Date() - start; // timing code
console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
writeFile("clubUsers3Hash.json", JSON.stringify(hashedUsers, null, 2));