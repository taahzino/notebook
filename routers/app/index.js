// Dependencies
const express = require('express');

// Modules
const decorateHTML = require('../../middlewares/common/decorateHTML');
const checkLogin = require('../../middlewares/auth/checkLogin');
const isLoggedIn = require('../../middlewares/auth/isLoggedIn');

// Create express router
const appRouter = express.Router();

// Handle requests
appRouter.get('/', decorateHTML, checkLogin, (req, res) => {
    res.render('index');
});
appRouter.get('/login', decorateHTML, isLoggedIn, (req, res) => {
    res.render('login');
});
appRouter.get('/signup', decorateHTML, isLoggedIn, (req, res) => {
    res.render('signup');
});

// Export the router object
module.exports = appRouter;
