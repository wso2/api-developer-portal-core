const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/((?!favicon.ico)):orgName/login', authController.login);
router.get('/((?!favicon.ico)):orgName/callback', authController.handleCallback);
router.get('/((?!favicon.ico)):orgName/logout', authController.handleLogOut);
router.get('/((?!favicon.ico)):orgName/signup', authController.handleSignUp);

module.exports = router;
