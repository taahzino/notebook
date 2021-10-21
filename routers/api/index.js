// Dependencies
const express = require('express');

// Create express router
const api = express.Router();

// Handle requests
api.use('/login', require('./login'));
api.use('/signup', require('./signup'));
api.use('/notes', require('./notes'));

// 404 handler
api.use((req, res) => {
    res.status(404).json({
        errors: {
            common: { msg: 'The page you are looking for does not exist!' },
        },
    });
});

// Export the router object
module.exports = api;
