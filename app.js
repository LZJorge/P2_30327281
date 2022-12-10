const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require("body-parser");
const flash = require('req-flash')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const db = require('./db/database.js')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: '123' }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.engine('ejs', require('ejs').renderFile);

app.use( (req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    next();
} );

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;