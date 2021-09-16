// Dependencies
const express = require('express');

// Create express router
const api = express.Router();

// Handle requests
api.use('/login', require('./login'));
api.use('/signup', require('./signup'));
api.use('/notes', require('./notes'));

// Export the router object
module.exports = api;
