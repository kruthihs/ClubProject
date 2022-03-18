import fetch from "node-fetch";

let urlBase = "http://localhost:5555/";

let newActivity = {"name": "Tap Dance time",
"dates": ["Oct 19th","Nov 21"],
"instructor": ["Master John","Master Nithya"]
};

let addActivity = {
    url: urlBase + "manageActivities",
    options: {
        method: "POST",
        body: JSON.stringify(newActivity),
        headers: { "Content-Type": "application/json" },
    },
};

let deleteActivity = {
    url: urlBase + "manageActivities",
    options: {
        method: "DELETE",
        body: JSON.stringify(newActivity),
        headers: { "Content-Type": "application/json" },
    },
};

let loginMember = {
    url: urlBase + "login",
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
    url: urlBase + "login",
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

async function activityTests() {
    console.log("\n1. Try adding activity without logging in");
    try {
        let res = await fetch(addActivity.url, addActivity.options);
        console.log(`Add activity result: ${res.statusText} Code:${res.status}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }

    console.log("\n2. Try deleting activity without logging in");
    try {
        let res = await fetch(deleteActivity.url, deleteActivity.options);
        console.log(`Delete activity result: ${res.statusText}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }

    try {
        console.log("\n3. Login as member");
        let res = await fetch(loginMember.url, loginMember.options);
        console.log(`login results: ${res.statusText} Code:${res.status}`);
        // Look at the cookie
        let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
        console.log(`Saved cookie: ${savedCookie}`);
        addActivity.options.headers.cookie = savedCookie;
        deleteActivity.options.headers.cookie = savedCookie;
        // User info from login
        let userInfo = await res.json();
        console.log(userInfo);
        console.log("\n1. Then try adding activity");
        res = await fetch(addActivity.url, addActivity.options);
        console.log(`Add activity result: ${res.statusText} Code:${res.status}\n`);
        let adddata = await res.json();
        console.log(adddata);
        console.log("\n2. Then try deleting activity");
        res = await fetch(deleteActivity.url, deleteActivity.options);
        console.log(`Delete activity result: ${res.statusText} Code:${res.status}\n`);
        let deldata = await res.json();
        console.log(deldata);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }

    console.log("\n4. Login as admin");
    try {
        let res = await fetch(loginAdmin.url, loginAdmin.options);
        console.log(`login results: ${res.statusText}`);
        // Look at the cookie
        let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
        console.log(`Saved cookie: ${savedCookie}`);
        addActivity.options.headers.cookie = savedCookie;
        deleteActivity.options.headers.cookie = savedCookie;
        // User info from login
        let userInfo = await res.json();
        console.log(userInfo);
        console.log("\n1. Then try adding activity");
        res = await fetch(addActivity.url, addActivity.options);
        console.log(`Add activity result: ${res.statusText} Code:${res.status}\n`);
        let adddata = await res.json();
        console.log(`Number of Activities after adding :${adddata.length}`);
        console.log("\n2. Then try deleting activity");
        res = await fetch(deleteActivity.url, deleteActivity.options);
        console.log(`Delete activity result: ${res.statusText} Code:${res.status} \n`);
        let deldata = await res.json();
        console.log(`Number of Activities after deleting :${deldata.length}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
}

activityTests();