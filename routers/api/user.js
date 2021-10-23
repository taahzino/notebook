// Dependencies
const express = require('express');

// Middlewares
const {
    signupValidators,
    signupvalidationHandler,
} = require('../../middlewares/user/signupValidators');
const checkLogin = require('../../middlewares/auth/checkLogin');

// Controllers
const { addUser, getUser } = require('../../controllers/userControllers');

// Create express router
const router = express.Router();

// ADD new user
router.post('/', signupValidators, signupvalidationHandler, addUser);

// GET user details
router.get('/', checkLogin, getUser);

// Export the router object
module.exports = router;
