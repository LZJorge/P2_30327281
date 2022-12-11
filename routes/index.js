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

    let ipAddress = req.socket.remoteAddress;

    db.run(`INSERT INTO users(name, email, message, address, date) VALUES ('${name}', '${email}', '${message}', '${ipAddress}', '${today}')`);
    
    res.redirect('/');
})

// TEST THE DB INFO JUST FOR SEE IT IS WORKING ON TASK 2
router.get('/test-the-database-info-30327281', (req, res)=> {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) throw err;
        
        res.send(rows)
    })
})

module.exports = router;