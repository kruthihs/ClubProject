import fetch from "node-fetch";

let getMembers = {
    url: "http://localhost:5555/members",
    options: {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    },
};

let loginMember = {
    url: "http://localhost:5555/login",
    options: {
        method: "POST",
        body: JSON.stringify({
            email: "chihuahua1899@gmail.com",//member
            password: "9E3423Gj3iJ",
        }),
        headers: { "Content-Type": "application/json" },
    },
};

let loginAdmin = {
    url: "http://localhost:5555/login",
    options: {
        method: "POST",
        body: JSON.stringify({
            email: "tirrivees1820@outlook.com",//admin
            password: "449OqspUq",
        }),
        headers: { "Content-Type": "application/json" },
    },
};

function extractCookies(rawStrings) {
    let cookies = [];
    rawStrings.forEach(function(ck) {
        cookies.push(ck.split(";")[0]); // Just grabs cookie name=value part
    });
    return cookies.join(";"); // If more than one cookie join with ;
}

async function memberTests() {
    console.log("\n1. Try getting the member information without logging in");
    try {
        let res = await fetch(getMembers.url, getMembers.options);
        console.log(`Get Members result: ${res.statusText} Code:${res.status}`);
        let data = await res.json();
        console.log(data);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    console.log("\nLogin as member and then Try getting the member information");
    try{
        let res = await fetch(loginMember.url, loginMember.options);
        console.log(`\n2. login Member results: ${res.statusText} Code:${res.status}`);
        // Look at the cookie
        let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
        console.log(`Saved cookie: ${savedCookie}`);
        getMembers.options.headers.cookie = savedCookie;
        let userInfo = await res.json();
        console.log(userInfo);
        res = await fetch(getMembers.url, getMembers.options);
        console.log(`\n3. Get Members result: ${res.statusText} Code:${res.status}\n`);
        let data = await res.json();
        console.log(data);
    }catch (e) {
        console.log(`Error: ${e}\n`);
    }
    console.log("\nLogin as admin and then Try getting the member information");
    try {
            let res = await fetch(loginAdmin.url, loginAdmin.options);
            console.log(`\n4. login Admin results: ${res.statusText} Code:${res.status}`);
            // Look at the cookie
            let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
            console.log(`Saved cookie: ${savedCookie}`);
            getMembers.options.headers.cookie = savedCookie;
            let userInfo = await res.json();
            console.log(userInfo);
            res = await fetch(getMembers.url, getMembers.options);
            console.log(`\n5. Get Members result: ${res.statusText} Code:${res.status}\n`);
    }catch (e) {
        console.log(`Error: ${e}\n`);
    }
}

memberTests();