// Dependencies
const express = require('express');

// Middlewares
const checkLogin = require('../../middlewares/auth/checkLogin');

// Create express router
const notesRouter = express.Router();

// Handle requests
notesRouter.get('/', checkLogin, (req, res) => {
    res.send('Notes home page');
});

// Export the router object
module.exports = notesRouter;
