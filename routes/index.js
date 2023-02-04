const express = require('express');
const router = express.Router();
const db = require('../db/database.js');
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
const sendEmail = require('../handler/email');
const dotenv = require('dotenv').config();

const date = new Date()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended:true
}));

/**
 * HOME
 * GET '/'
 */
router.get('/', (req, res) => {
    res.render('index.ejs');
});

/**
 * HOME
 * POST '/'
 */
router.post('/submit', (req, res) => {

    // Verifying reCAPTCHA
    const responseKey = req.body["g-recaptcha-response"];
    const captchaSecretKey = process.env.CAPTCHA_SECRET;

    fetch(`https://www.google.com/recaptcha/api/siteverify?
        secret=${captchaSecretKey}&response=${responseKey}`, {
            method: 'POST',
        })
        .then((response) => response.json())
        .then((google_response) => {
            if (google_response.success != true) return;
        });

    // Getting the Address
    const ipApiKey = process.env.IP_API_KEY;
    
    fetch(`http://api.ipapi.com/api/check?access_key=${ipApiKey}`)
        .then((response) => response.json())
        .then( async (ipapi_response) => {
            const ip = ipapi_response.ip;
            const country = ipapi_response.country_name;

            let { fullname, email, message } = req.body;
            let today = date.toLocaleString(); 
            
            // Sending form data to Email
            await sendEmail.sendContactEmail({
                fullname,
                email,
                message,
                ip,
                date: today,
                country,
            }) 

            // Saving form data
            db.run(`INSERT INTO users(name, email, message, address, date, country) VALUES ('${fullname}', '${email}', '${message}', '${ip}', '${today}', '${country}')`);
        });

    res.redirect('/');
})

/**
 * TEST THE DB INFO JUST FOR SEE IT IS WORKING ON TASK 2
 * GET '/test-the-database-info-30327281'
 * Esta ruta es solo para pruebas y confirmaciones, se conoce que esto NO se debe hacer en un ambiente real.
 */
router.get('/test-the-database-info-30327281', (req, res)=> {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) throw err;
        
        res.send(rows)
    })
})

module.exports = router;