// Dependencies
const express = require('express');

// Modules
const decorateHTML = require('../../middlewares/common/decorateHTML');
const checkLogin = require('../../middlewares/auth/checkLogin');
const isLoggedIn = require('../../middlewares/auth/isLoggedIn');
const { doLogout } = require('../../controllers/loginControllers');

// Controllers
const {
    getAllNotes,
    getBookmarkedNotes,
    getArchivedNotes,
} = require('../../controllers/notesControllers');

// Create express router
const appRouter = express.Router();

// Handle requests
appRouter.get('/', decorateHTML, checkLogin, getAllNotes, (req, res) => {
    res.locals.activeItem = 'index';
    res.render('index');
});

appRouter.get('/bookmarks', decorateHTML, checkLogin, getBookmarkedNotes, (req, res) => {
    res.locals.activeItem = 'bookmarks';
    res.render('bookmarks');
});

appRouter.get('/archives', decorateHTML, checkLogin, getArchivedNotes, (req, res) => {
    res.locals.activeItem = 'archives';
    res.render('archives');
});

appRouter.get('/user', decorateHTML, checkLogin, getArchivedNotes, (req, res) => {
    res.locals.activeItem = 'user';
    res.render('user');
});

appRouter.get('/login', decorateHTML, isLoggedIn, (req, res) => {
    res.render('login');
});

appRouter.get('/signup', decorateHTML, isLoggedIn, (req, res) => {
    res.render('signup');
});

appRouter.get('/logout', decorateHTML, doLogout);

// Export the router object
module.exports = appRouter;
