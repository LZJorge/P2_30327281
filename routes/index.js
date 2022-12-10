const express = require('express');
const router = express.Router();
const db = require('../db/database.js');
const bodyParser = require("body-parser");

const date = new Date()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended:true
}));

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.post('/', (req, res) => {
    let name = req.body.fullname;
    let email = req.body.email;
    let message = req.body.message;
    let today = date.toLocaleString();

    const ipAddress = req.socket.remoteAddress;

    db.run(`INSERT INTO users(name, [email], message, address, date) VALUES ('${name}', '${email}', '${message}', '${ipAddress}', '${today}')`);
    req.flash('successMessage', 'Comentario enviado satisfactoriamente');
    
    res.redirect('/');
})

module.exports = router;