import pkg from 'chai';
const { assert } = pkg;
import fetch from 'node-fetch'
import getCookies from './getCookies.mjs';

let urlBase = "http://localhost:5555/";

let applicant = {
	"name":"perinaia",
    "email" : "periniblah@gdh.com",
    "phone" : 5249781257, 
};
let res;
let myCookie;
describe('Applicant Tests', function () {
    it('accepts valid data',async function () {
        res = await fetch(urlBase + 'applicants', {
            method: "post",
            body: JSON.stringify(applicant),
            headers: {
                "Content-Type": "application/json",
                cookie: myCookie
            },
        });
        assert.equal(res.status, 200);
    })

    const overlyLargeData = {
        ...applicant
    };
    before(async function (){
        for(let i =0 ; i< 2049;i++){
            overlyLargeData.name += "a"
        }
    })
    it('Rejects Overly Large JSON data', async function () {
        res = await fetch(urlBase + 'applicants', {
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
        res = await fetch(urlBase + 'applicants', {
            method: "post",
            body: JSON.stringify({
                name : "kirataka",
                phone : 2794258754
            }),
            headers: {
                "Content-Type": "application/json",
                cookie: myCookie
            },
        });
        assert.equal(res.status, 400);
        assert.equal((await res.json()).invalidSchema, true);
    })

    it('Rejects data with bad email', async function () {
        res = await fetch(urlBase + 'applicants', {
            method: "post",
            body: JSON.stringify({
                ...applicant,
                email: "bademail"
            }),
            headers: {
                "Content-Type": "application/json",
                cookie: myCookie
            },
        });
        assert.equal(res.status, 400);
        assert.equal((await res.json()).invalidSchema, true);
    })
})