const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const flash = require('connect-flash');

const passportLocal = require('./config/passport');
const passportGoogle = require('./middlewares/google');

const app = express();

app.use(express.urlencoded({ extended: false }));

/**
 * Static folders
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

/**
 * Set View Engine 'Ejs'
 */
app.set('view engine', 'ejs')

app.use(cookieParser());

// Sessions
app.use( session({
    secret: 'supersecretkey',
    saveUninitialized: true,
    resave: false
}));

app.use(passportLocal.initialize());
app.use(passportLocal.session());

app.use(passportGoogle.initialize());
app.use(passportGoogle.session());

app.use(flash());

/**
 * App Routes
 */
app.use('/', indexRouter);
app.use('/user', usersRouter);

/**
 * Database
 */
const Message = require('./models/Messages');
Message.sync();

const User = require('./models/Users');
User.sync();

module.exports = app;