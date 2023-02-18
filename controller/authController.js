const passport = require('passport');

/**
 * Local Authentication
 * POST 'login/auth'
 */
exports.authenticateUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

/**
 * Google Authentication
 * GET 'login/auth/google'
 */
exports.googleAuthenticateUser = passport.authenticate('google', {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

/**
 * Route for protect url
 */
exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated() ) {
        return next();
    };

    req.flash('error', 'Necesitas estar autenticado');
    return res.redirect('/user/register');
};

// req.flash requires sessions so i can't logout without getting an error :(
/*
exports.logout = (req, res) => {
    req.session.destroy(()=> {
        req.flash('success', 'Se ha desconectado correctamente');
        res.redirect('/');
    });
}
*/