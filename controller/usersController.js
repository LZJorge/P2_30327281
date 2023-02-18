const Users = require('../models/Users');
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();

/**
 * REGISTER
 * GET '/user/register'
 */
exports.register = (req, res) => {
    res.render('register', {
        title: 'Registrate',
        success: req.flash('success'),
        error: req.flash('error')
    });
};

/**
 * REGISTER
 * POST '/user/register/new-account'
 */
exports.newAccount = async (req, res) => {
    
    // Verifying reCAPTCHA
    const responseKey = req.body["g-recaptcha-response"];
    const captchaSecretKey = process.env.CAPTCHA_SECRET;

    try {
        await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=${responseKey}`, {
            method: 'POST',
        })
        .then((response) => response.json())
        .then(  (google_response) => {
            console.log(google_response);
            if (google_response.success == false) {
                req.flash('error', 'Verifique el captcha nuevamente');
                throw new Error('Verify recaptcha');
            };
        });
    } catch(err) {
        return res.redirect('/');
    }
    
    const { email, password } = req.body;

    // Validators
    if (email == "") {
        req.flash('error', 'Correo no válido');
        return res.redirect('/user/register');
    };

    if (password.length < 8) {
        req.flash('error', 'La contraseña debe tener un mínimo de 8 caracteres');
        return res.redirect('/user/register');
    };
    
    try {
        const newUser = Users.build({
            email: email,
            password: password
        });

        await newUser.save()
        .then( ()=> {
            req.flash('success', 'Cuenta creada satisfactoriamente');
            res.redirect('/user/login');
        } );
    } catch(err) {
        req.flash('error', 'No se pudo crear la cuenta, verifique e intente nuevamente');
    };
}
 
/**
 * LOGIN
 * GET '/user/login'
 */
exports.login = (req, res) => {
    res.render('login', {
        title: 'Iniciar sesión',
        success: req.flash('success'),
        error: req.flash('error')
    })
}