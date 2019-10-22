const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const AuthController = require("../controllers/auth_controller");
const { ensureUser, ensureGuest } = require('../helpers/auth');


router.get('/google',              passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',     passport.authenticate('google', { failureRedirect: '/login' }), AuthController.loggedIn);
router.get('/verify',              AuthController.verify);
router.get('/logout', ensureUser,  AuthController.logout);
router.get('/login',  ensureGuest, AuthController.login);

module.exports = router;
