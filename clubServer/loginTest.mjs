import fetch from 'node-fetch';

const loginUrl = "http://localhost:5555/login";
let user1 =  {
    "email": "tirrivees1820@outlook.com",
    "password": "449OqspUq",
  };

let user2 = {
    "email": "blahblah@gmail.com",
    "password": "9E3423Gj3iJ",
  };

let user3 = {
    "email": "umbrate1989@yahoo.com",
    "password": "1n3Yes123",
  };

fetch(loginUrl, {
    method: 'POST',
    body:    JSON.stringify(user1),
    headers: { 'Content-Type': 'application/json' },
})
.then(res => {
    console.log(`Good login test return code: ${res.status}`);
    res.json().then(data =>
        console.log(data))
    return fetch(loginUrl, {
        method: 'POST',
        body:    JSON.stringify(user2),
        headers: { 'Content-Type': 'application/json' },
    });
  })
.then(res => {
    console.log(`Bad Email test return code: ${res.status}`);
    res.json().then(data =>
        console.log(data))
    return fetch(loginUrl, {
        method: 'POST',
        body:    JSON.stringify(user3),
        headers: { 'Content-Type': 'application/json' },
    });
  })
  .then(res => {
    console.log(`Bad Password test return code: ${res.status}`);
    res.json().then(data =>
        console.log(data))
  })
  console.log("Starting my web requests:");