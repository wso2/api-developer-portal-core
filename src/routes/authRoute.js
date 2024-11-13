const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const registerPartials = require('../middlewares/registerPartials');

router.get('/((?!favicon.ico)):orgName/login', registerPartials, authController.login);
router.get('/((?!favicon.ico)):orgName/callback', registerPartials, authController.handleCallback);
router.get('/((?!favicon.ico)):orgName/logout', registerPartials, authController.handleLogOut);
router.get('/((?!favicon.ico)):orgName/signup', registerPartials, authController.handleSignUp);

module.exports = router;

