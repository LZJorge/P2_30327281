const sqlite3 = require('sqlite3').verbose();

// DB connection
const db = new sqlite3.Database('./db.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log(err);
});

// DB create table
db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT, email TEXT, message TEXT, address TEXT, date TEXT, country TEXT)');

module.exports = db;