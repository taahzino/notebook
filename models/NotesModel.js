// Dependencies
const mongoose = require('mongoose');

// Create a schema
const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        bookmarked: {
            type: Boolean,
            default: false,
        },
        pinned: {
            type: Boolean,
            default: false,
        },
        archived: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Create a model
const NotesModel = mongoose.model('note', NoteSchema);

// Export the model
module.exports = NotesModel;
