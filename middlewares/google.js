const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../models/Users');

passport.use(
    new GoogleStrategy(

    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/user/login/auth/google",
        passReqToCallback: true
    },

    async (request, accessToken, refreshToken, profile, done) => {
        
        const newUser = {
            email: profile.emails[0].value
        }

        try {
            let user = await User.findOne({
                where: {
                    email: profile.emails[0].value
                }
            });

            if (user) {
                done(null, user, {
                    message: '¡Se ha logueado correctamente!'
                });
            } else {
                await User.create(newUser);
            };
        } catch(err) {
            console.log(err)
        };
    }
));

passport.serializeUser((user, callback) => {
    callback(null, user);
});

passport.deserializeUser((user, callback) => {
    callback(null, user);
});

module.exports = passport;