import express from 'express';
import bcrypt from 'bcryptjs';
import { readFile } from 'fs/promises'; 
import session from 'express-session';
import Ajv from 'ajv';
import addFormats from "ajv-formats"
import DataStore from "nedb-promises";

const activitydb = DataStore.create("./activityDB");
const memberdb = DataStore.create("./memberDB");

const ajv = new Ajv();
addFormats(ajv)
const app = express();
const cookieName = "vd6046Cookie"; // Session ID cookie name, use this to delete cookies too.


app.use(express.json({limit : "2kb"}));
app.use(session({
    secret: 'San Jose Dancers club',
    resave: false,
    saveUninitialized: false,
    name: cookieName // Sets the name of the cookie used by the session middleware
}));

const activitySchema = JSON.parse(await readFile('./activitySchema.json',
'utf8'));
const applicantSchema = JSON.parse(await readFile('./applicantSchema.json',
'utf8'));

function setUpSessionMiddleware(req, res, next) {
    console.log(`\nsession object: ${JSON.stringify(req.session)}`);
    console.log(`session id: ${req.session.id}`);
    if (!req.session.user) {
        req.session.user = { role: "guest" };
    };
    next();
};

app.use(setUpSessionMiddleware);

// Use this middleware to restrict paths to only logged in users
function checkMemberMiddleware(req, res, next) {
    if (req.session.user.role === "guest") {
        res.status(401).json({ error: "Not permitted" });;
    } else {
       // console.log(`\nSession info: ${JSON.stringify(req.session)} \n`);
        next();
    }
};

// Use this middleware to restrict paths only to admins
function checkAdminMiddleware(req, res, next) {
    if (req.session.user.role !== "admin") {
        res.status(401).json({ error: "Not permitted" });;
    } else {
       // console.log(`\nSession info: ${JSON.stringify(req.session)} \n`);
        next();
    }
};
// Use this middleware to restrict paths only to admins and members
function checkAdminMemberMiddleware(req, res, next) {
    if (req.session.user.role !== "admin" && req.session.user.role !== "member" ) {
        res.status(401).json({ error: "Not permitted" });;
    } else {
       // console.log(`\nSession info: ${JSON.stringify(req.session)} \n`);
        next();
    }
};

app.get('/info', function(req, res) {
    let myObj = {clubName: "San Jose Dance Club",
    ownerName: "Kruthi H S",
    ownerNetId: "vd6046"};

    res.json(myObj);
});

app.get('/activities', async function(req, res) {
    let activities = await activitydb.find({});
    res.json(activities);
});

const validateActivities = ajv.compile(activitySchema);
app.post('/manageActivities', checkAdminMemberMiddleware, async function(req, res){
    const valid = validateActivities(req.body)
    if (!valid) {
        res.status(400).json({ message: validateActivities.errors, invalidSchema: true });
        console.log(validateActivities.errors);
        return;
    }
    let activities = null;
    await activitydb.insert(req.body).then(async function() {
    activities = await activitydb.find({});
    console.log("We found " + activities.length + " Activities after adding");
    })      
    res.json(activities);
})

app.delete('/manageActivities', checkAdminMiddleware, async function(req, res){
    let activityToDelete = await activitydb.find({ name: req.body.name });
    let activities = await activitydb.remove({ _id: activityToDelete.id });
    console.log("We found " + activities.length + " Activities after deleting");      
    res.json(activities);
})


app.get('/members',checkMemberMiddleware, checkAdminMiddleware, async function(req, res) {
    let members = await memberdb.find({}, { firstName: 1 , lastName: 1 });
    res.json(members);
});

const validateApplicants = ajv.compile(applicantSchema);

app.post('/applicants', function(req, res){
    const valid = validateApplicants(req.body)
    if (!valid) {
        res.status(400).json({ message: validateApplicants.errors, invalidSchema: true });
        return;
    }
    res.json({ message: "Successful!" });
})

app.post('/login', async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let loginMembers = await memberdb.find({});
    let auser = loginMembers.find(function (user) {
        return user.email === email;
    });
    if (!auser) {// Not found
        res.status(401).json({error: true, message: "User/Password error"});
        return;
    }
    let verified = bcrypt.compareSync(password, auser.password);
    if (verified) {
        let oldInfo = req.session.user;
        req.session.regenerate(function(err) {
            if (err) {
                console.log(err);
            }
            let newUserInfo = Object.assign(oldInfo, auser);
            delete newUserInfo.password;
            req.session.user = newUserInfo;
            res.json(newUserInfo);
        });
    } else {
        res.status(401).json({error: true, message: "User/Password error"});
    }
});

app.get('/logout', function (req, res) {
    let options = req.session.cookie;
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        res.clearCookie(cookieName, options); // the cookie name and options
        res.json({message: "Goodbye"});
    })
});

function jsonErrors(err, req, res, next) {
    if(err) {
        res.status(400).json({message: "Max limit is 2kb", limitExceeded : true});
        console.log(JSON.stringify(err));
    }
}

app.use(jsonErrors);
app.listen(5555, function () {
    console.log('Dance Club app listening on port 5555!');
});

export default app;