// Dependencies
const path = require('path');
const express = require('express');

// Modules
const isUrl = require('../../utils/isUrl');
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
const { getUser } = require('../../controllers/userControllers');

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

appRouter.get('/user', decorateHTML, checkLogin, getUser, (req, res) => {
    res.locals.activeItem = 'user';
    res.render('user');
});

appRouter.get('/user/profile/image', decorateHTML, checkLogin, (req, res) => {
    const { photo } = res.locals.user;
    if (photo.trim().length === 0) {
        res.sendFile(path.join(__dirname, '../../public/assets/images/user_avatar.jpg'));
    } else if (isUrl(photo)) {
        res.redirect(photo);
    } else {
        res.sendFile(path.join(__dirname, `../../uploads/${photo}`));
    }
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
