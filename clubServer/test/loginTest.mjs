import pkg from 'chai';
const { assert } = pkg;
import fetch from 'node-fetch'
import getCookies from './getCookies.mjs';

let urlBase = "http://localhost:5555/";

function getCookie(name, cookie) {
    const value = `; ${cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

describe('Login Tests', function() {
    let res;
    let myCookie = null;
    before(async function() {
        res = await fetch(urlBase + 'info');
        myCookie = getCookies(res);
    })
it('Cookie with appropriate name is returned', function() {
    assert.include(myCookie, 'vd6046Cookie');
});
describe('Login Sequence', function() {
    before(async function() {
        res = await fetch(urlBase + 'login', {
            method: "post",
            body: JSON.stringify({
                "email": "chihuahua1899@gmail.com",
                "password": "9E3423Gj3iJ"
            }),
            headers: {
                "Content-Type": "application/json",
                cookie: myCookie
            },
        });
    });
    it('Login Good', function() {
        assert.equal(res.status, 200);
    });
    it('User returned', async function() {
        let user = await res.json();
        assert.containsAllKeys(user, ['firstName', 'lastName', 'role']);
    });
    it('Cookie session ID changed', function() {
        let cookie = getCookies(res);
        assert.notEmpty(cookie);
        assert.notEqual(cookie, myCookie);
    });
});
describe('Logout Tests', function() {
    let res;
    let myCookie = null;
    before(async function() {
        res = await fetch(urlBase + 'logout');
        myCookie = getCookies(res);
    })
it('logout, cookie cleared', function() {
    assert.isUndefined(getCookie(myCookie));
});
});
describe('Bad Logins', function() {
    it('Bad Email', async function() {
        res = await fetch(urlBase + 'login', {
            method: "post",
            body: JSON.stringify({
                "email": "chihua1899@gmail.com",
                "password": "9E3423Gj3iJ"
            }),
            headers: {
                "Content-Type": "application/json",
                cookie: myCookie
            },
        });
        assert.equal(res.status, 401);
    });
    it('Bad Password', async function() {
        before(async function() {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "chihuahua1899@gmail.com",
                    "password": "9E34j3iJ"
                }),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 401);
        });
    })
})
})