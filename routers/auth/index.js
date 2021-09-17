// Dependencies
const express = require('express');
const passport = require('passport');

// Modules
const isLoggedIn = require('../../middlewares/auth/isLoggedIn');

// Create express router
const authRouter = express.Router();

// Handle requests
authRouter.get(
    '/google',
    isLoggedIn,
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
    '/google/callback',
    isLoggedIn,
    passport.authenticate('google', {
        failureRedirect: '/login',
    }),
    (req, res) => {
        res.redirect('/');
    }
);

// Export the router object
module.exports = authRouter;
