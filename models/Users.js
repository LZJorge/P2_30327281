const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const User = db.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    email: {
        type: DataTypes.STRING(120),
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING(),
        validate: {
            min: 8
        }
    }
}, {
    modelName: 'users',
    hooks: {
        beforeSave(user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
});

User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = User;