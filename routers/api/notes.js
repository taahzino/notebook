// Dependencies
const express = require('express');

// Middlewares
const checkLogin = require('../../middlewares/auth/checkLogin');
const { noteValidation } = require('../../middlewares/notes/noteValidators');
const checkAccess = require('../../middlewares/notes/checkAccess');

// Controllers
const { saveNote, getAllNotes, deleteANote } = require('../../controllers/notesControllers');

// Create express router
const notesRouter = express.Router();

// Get all notes
notesRouter.get('/', checkLogin, getAllNotes);

// Create a note
notesRouter.post('/', checkLogin, noteValidation, saveNote);

// Delete a note
notesRouter.delete('/:id', checkLogin, checkAccess, deleteANote);

// Export the router object
module.exports = notesRouter;
