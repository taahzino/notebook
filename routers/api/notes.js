// Dependencies
const express = require('express');

// Middlewares
const checkLogin = require('../../middlewares/auth/checkLogin');
const { noteValidation } = require('../../middlewares/notes/noteValidators');

// Controllers
const { saveNote } = require('../../controllers/notesControllers');

// Create express router
const notesRouter = express.Router();

// Handle requests
notesRouter.get('/', checkLogin, (req, res) => {
    res.send('Notes home page');
});

// Create a note
notesRouter.post('/', checkLogin, noteValidation, saveNote);

// Export the router object
module.exports = notesRouter;
