const Message = require("../models/Messages");
const fetch = require('node-fetch');
const sendEmail = require('../handlers/email');
const dotenv = require('dotenv').config();

/**
 * HOME
 * GET '/'
 */
exports.index = (req, res) => {
    res.render('index', {
        title: 'Inicio',
        success: req.flash('success'),
        error: req.flash('error')
    });
};

/**
 * Contact page
 * GET '/contact'
 */
exports.contact = (req, res) => {
    res.render('contact', {
        title: '¡Contáctame!',
        success: req.flash('success'),
        error: req.flash('error')
    });
};

/**
 * SUBMIT
 * POST '/submit'
 */
exports.submit = async (req, res) => {
 
    // Verifying reCAPTCHA
    const responseKey = req.body["g-recaptcha-response"];
    const captchaSecretKey = process.env.CAPTCHA_SECRET;

    try {
        await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=${responseKey}`, {
            method: 'POST',
        })
        .then((response) => response.json())
        .then(  (google_response) => {
            if (google_response.success == false) {
                req.flash('error', 'Verifique el captcha nuevamente');
                throw new Error('Verify recaptcha');
            };
        });
    } catch(err) {
        return res.redirect('/');
    }
    
    const { name, email, message, ip, country } = req.body;    
    const date = Date.now();

    try {
        // Sending email
        await sendEmail.sendContactEmail({
            name,
            email,
            message,
            ip,
            date,
            country,
        });

        // Saving the form data
        const newMessage = Message.build({
            author: name,
            email: email,
            message: message,
            date: date,
            country: country,
            author_ip: ip
        });

        await newMessage.save()
        .then( ()=> {
            req.flash('success', '¡Mensaje enviado satisfactoriamente!');
            res.redirect('/');
        });
        
    } catch(error) {
        req.flash('error', 'Ha ocurrido un error, verifique e intente nuevamente.');
        return res.redirect('/contact');
    };
};