// Dependencies
const mongoose = require('mongoose');

// Create a schema
const GoogleUserSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            default: '',
        },
        userType: {
            type: String,
            default: 'googleUser',
        },
        notes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'note',
            },
        ],
    },
    { timestamps: true }
);

// Create a model
const GoogleUserModel = mongoose.model('googleUser', GoogleUserSchema);

// Export the model
module.exports = GoogleUserModel;
