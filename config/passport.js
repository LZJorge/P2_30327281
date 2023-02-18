const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/Users');

passport.use(
    new localStrategy(

        {
            usernameField: 'email',
            passwordField: 'password'
        },

        async (email, password, done) => {
            try {
                const user = await User.findOne({
                    where: { email: email }
                });

                if(!user.verifyPassword(password)) {
                    return done(null, false, {
                        message: 'Contraseña incorrecta'
                    });
                };

                return done(null, user, {
                    message: '¡Se ha logueado correctamente!'
                });

            } catch(err) {
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                });
            }
        }
    )
);

passport.serializeUser((user, callback) => {
    callback(null, user);
});

passport.deserializeUser((user, callback) => {
    callback(null, user);
});

module.exports = passport;