import fetch from 'node-fetch';

const serverUrl = "http://localhost:5555/";

async function testInfoActMems() {
    let res = await fetch(serverUrl + "info");
    let info = await res.json();
    console.log(`Club Name: ${info.clubName}`);

    res = await fetch(serverUrl + "activities");
    let activities = await res.json();
    console.log(`Number of Activities: ${activities.length}`);

    res = await fetch(serverUrl + "members");
    let members = await res.json();
    console.log(`Number of Members: ${members.length}`);
}

testInfoActMems();