const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Message = db.define('Messages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    author: {
        type: DataTypes.STRING(90),
        validate: {
            min: 3,
        }
    },

    email: {
        type: DataTypes.STRING(120),
        validate: {
            isEmail: true
        }
    },

    message: {
        type: DataTypes.STRING(),
        validate: {
            min: 3
        }
    },

    date: DataTypes.DATE(),

    country: DataTypes.STRING(40),
    
    author_ip: DataTypes.STRING(30),

}, {
    modelName: 'messages'
});

module.exports = Message;