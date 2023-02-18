const { Sequelize } = require('sequelize');
const SQLite = require('sqlite3')

const db = new Sequelize('db', '', '', {
  dialect: 'sqlite',
  storage: './db.sqlite3',
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE,
  },
});

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = db;