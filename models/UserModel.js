// Dependencies
const mongoose = require('mongoose');

// Create a schema
const UserSchema = new mongoose.Schema(
    {
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
        password: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

// Create a model
const UserModel = mongoose.model('people', UserSchema);

// Export the model
module.exports = UserModel;
