import fetch from 'node-fetch';

let newActivity = {"name": "Tap Dance time",
"dates": ["Oct 19th","Nov 21"],
"instructor": ["Master John","Master Nithya"]
};

fetch('http://localhost:5555/activities', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})
.then(res => res.json())
.then(data => console.log(`The club has ${data.length} activities currently`));

fetch('http://localhost:5555/activities', {
        method: 'post',
        body:    JSON.stringify(newActivity),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json(console.log(`Post successful with response status ${res.status}`)))
    .then(data => console.log(`The club has ${data.length} activities currently`));
    
fetch('http://localhost:5555/activities', {
        method: 'DELETE',
        body:    JSON.stringify(newActivity),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json(console.log(`Delete successful with response status ${res.status}`)))
    .then(data => console.log(`The club has ${data.length} activities currently`));