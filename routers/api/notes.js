// Dependencies
const express = require('express');

// Middlewares
const checkLogin = require('../../middlewares/auth/checkLogin');
const {
    createNoteValidation,
    updateNoteValidation,
} = require('../../middlewares/notes/noteValidators');
const checkAccess = require('../../middlewares/notes/checkAccess');

// Controllers
const {
    saveNote,
    getANote,
    getAllNotes,
    updateANote,
    deleteANote,
} = require('../../controllers/notesControllers');

// Create express router
const notesRouter = express.Router();

// Get all notes
notesRouter.get('/', checkLogin, getAllNotes);

// Get a note
notesRouter.get('/:id', checkLogin, checkAccess, getANote);

// Create a note
notesRouter.post('/', checkLogin, createNoteValidation, saveNote);

// Update a note
notesRouter.put('/:id', checkLogin, checkAccess, updateNoteValidation, updateANote);

// Delete a note
notesRouter.delete('/:id', checkLogin, checkAccess, deleteANote);

// Export the router object
module.exports = notesRouter;
