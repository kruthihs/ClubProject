import { readFile } from "fs/promises";
import DataStore from "nedb-promises";

const activitydb = DataStore.create("./activityDB");
const memberdb = DataStore.create("./memberDB");

const activities = JSON.parse(await readFile('./eventData.json',
  'utf8'));
const members = JSON.parse(await readFile('./clubUsers3Hash.json',
  'utf8'));


  async function cleanAndInsertActivityDB() {
    // Clear out any existing entries if they exist
    let numRemoved = await activitydb.remove({}, { multi: true });
    console.log("clearing Activity database, removed " + numRemoved);
  
    // We let NeDB create _id property for us.
    let newDocs = activitydb.insert(activities);
    console.log("Added Activities " + newDocs.length + " activities");
  }
  
  cleanAndInsertActivityDB();

  async function cleanAndInsertMemberDB() {
    // Clear out any existing entries if they exist
    let numRemoved = await memberdb.remove({}, { multi: true });
    console.log("clearing Member database, removed " + numRemoved);
  
    // We let NeDB create _id property for us.
    let newDocs = memberdb.insert(members);
    console.log("Added Members " + newDocs.length + " members");
  }
  
  cleanAndInsertMemberDB();