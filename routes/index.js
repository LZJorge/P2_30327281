const express = require('express');
const fetch = require('node-fetch');
const indexController = require('../controller/indexController');
const authController = require('../controller/authController');

const router = express.Router();

/**
 * Home
 */
router.get('/', indexController.index);

router.get('/contact',
    authController.isAuthenticated,
    indexController.contact
);

router.post('/submit',     
    authController.isAuthenticated,
    indexController.submit
);

module.exports = router;