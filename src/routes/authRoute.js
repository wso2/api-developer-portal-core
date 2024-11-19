const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const registerPartials = require('../middlewares/registerPartials');

router.get('/:orgName/login', registerPartials, authController.login);
router.get('/:orgName/callback', registerPartials, authController.handleCallback);
router.get('/:orgName/logout', registerPartials, authController.handleLogOut);
router.get('/:orgName/signup', registerPartials, authController.handleSignUp);

module.exports = router;

