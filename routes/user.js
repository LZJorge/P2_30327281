const express = require('express');
const usersController = require('../controller/usersController');
const authController = require('../controller/authController');

const router = express.Router();

/**
 * Register
 */
router.get('/register', usersController.register);
router.post('/register/new-account', usersController.newAccount);

/**
 * Login
 */
router.get('/login', usersController.login);
router.post('/login/auth', authController.authenticateUser);

router.get('/login/auth/google', authController.googleAuthenticateUser);

module.exports = router;