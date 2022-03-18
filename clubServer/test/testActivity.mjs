import pkg from 'chai';
const { assert } = pkg;
import fetch from 'node-fetch'
import getCookies from './getCookies.mjs';

let urlBase = "http://localhost:5555/";

let newActivityDelete = {
    "name": "Tap Dance time",
    "dates": ["Oct 19th", "Nov 21"],
    "instructor": ["Master John", "Master Nithya"]
};

let newActivityAdd = {
    "name": "Bachata time",
    "dates": ["Dec 10th", "Nov 21"],
    "instructor": ["Master John"]
};
let res;
let myCookie;
describe('Get Activity Tests', function () {
    let allActivities = null;

    before('get Activities without login', async function () {
        res = await fetch(urlBase + 'activities');
    })
    it('returns an array of activities', async function () {
        allActivities = await res.json();
        assert.isArray(allActivities);
    });
})
describe('Add Activity Tests', function () {
    it('Should not add Activity without logging in', async function () {
        res = await fetch(urlBase + 'manageActivities', {
            method: "post",
            body: JSON.stringify(newActivityAdd),
            headers: {
                "Content-Type": "application/json",
                cookie: myCookie
            },
        });
        assert.equal(res.status, 401);
    });
    describe("Login and Add Activities", async function() {

        it('Adds Activity when logged in as member', async function () {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "chihuahua1899@gmail.com",
                    "password": "9E3423Gj3iJ"
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            myCookie = getCookies(res);
    
            res = await fetch(urlBase + 'manageActivities', {
                method: "post",
                body: JSON.stringify(newActivityAdd),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 200);
        });

        const overlyLargeData = {
            ...newActivityAdd
        };

        before(async function (){
            for(let i =0 ; i< 2049;i++){
                overlyLargeData.name += "a"
            }
        })
        it('Rejects Overly Large JSON data', async function () {
            res = await fetch(urlBase + 'manageActivities', {
                method: "post",
                body: JSON.stringify(overlyLargeData),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 400);
            assert.equal((await res.json()).limitExceeded, true);
        })
    
        it('Rejects data with missing fields', async function () {
            const badActivity = { ...newActivityAdd };
            delete badActivity["name"];
            res = await fetch(urlBase + 'manageActivities', {
                method: "post",
                body: JSON.stringify(badActivity),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 400);
            assert.equal((await res.json()).invalidSchema, true);
        })
    });
    
})

describe('Delete Activity Tests', function () {

    it('Should not delete Activity without logging in', async function () {
        res = await fetch(urlBase + 'manageActivities', {
            method: "DELETE",
            body: JSON.stringify(newActivityDelete),
            headers: {
                "Content-Type": "application/json",
                cookie: myCookie
            },
        });
        assert.equal(res.status, 401);
    });
    it('Should not delete Activity when logged in as member', async function () {
        res = await fetch(urlBase + 'login', {
            method: "post",
            body: JSON.stringify({
                "email": "chihuahua1899@gmail.com",
                "password": "9E3423Gj3iJ"
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        myCookie = getCookies(res);

        res = await fetch(urlBase + 'manageActivities', {
            method: "DELETE",
            body: JSON.stringify(newActivityDelete),
            headers: {
                "Content-Type": "application/json",
                cookie: myCookie
            },
        });
        assert.equal(res.status, 401);
    });

    it('Deletes Activity when logged in as Admin', async function () {
        res = await fetch(urlBase + 'login', {
            method: "post",
            body: JSON.stringify({
                "email": "tirrivees1820@outlook.com",
                "password": "449OqspUq"
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        myCookie = getCookies(res);

        res = await fetch(urlBase + 'manageActivities', {
            method: "DELETE",
            body: JSON.stringify(newActivityDelete),
            headers: {
                "Content-Type": "application/json",
                cookie: myCookie
            },
        });
        assert.equal(res.status, 200);
    });
})

