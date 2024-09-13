const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/((?!favicon.ico)):orgName/login', authController.login, passport.authenticate('oauth2'));

module.exports = router;
