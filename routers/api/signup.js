// Dependencies
const express = require('express');

// Middlewares
const {
    signupValidators,
    signupvalidationHandler,
} = require('../../middlewares/user/signupValidators');

// Controllers
const { addUser } = require('../../controllers/userControllers');

// Create express router
const router = express.Router();

// Handle requests
router.post('/', signupValidators, signupvalidationHandler, addUser);

// Export the router object
module.exports = router;
