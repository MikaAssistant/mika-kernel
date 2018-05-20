const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./src/database/db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ devices: [] }).write()

module.exports = db;