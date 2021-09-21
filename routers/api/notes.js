// Dependencies
const express = require('express');

// Middlewares
const checkLogin = require('../../middlewares/auth/checkLogin');
const { noteValidation } = require('../../middlewares/notes/noteValidators');

// Controllers
const { saveNote, getAllNotes } = require('../../controllers/notesControllers');

// Create express router
const notesRouter = express.Router();

// Get all notes
notesRouter.get('/', checkLogin, getAllNotes);

// Create a note
notesRouter.post('/', checkLogin, noteValidation, saveNote);

// Export the router object
module.exports = notesRouter;
