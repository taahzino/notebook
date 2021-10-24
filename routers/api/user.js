// Dependencies
const express = require('express');

// Middlewares
const {
    signupValidators,
    signupvalidationHandler,
} = require('../../middlewares/user/signupValidators');
const {
    updateValidators,
    updateValidationHandler,
} = require('../../middlewares/user/updateValidtors');
const checkLogin = require('../../middlewares/auth/checkLogin');

// Controllers
const { addUser, getUser, updateUser } = require('../../controllers/userControllers');

// Create express router
const router = express.Router();

// ADD new user
router.post('/', signupValidators, signupvalidationHandler, addUser);

// GET user details
router.get('/', checkLogin, getUser);

// UPDATE an user
router.put('/', checkLogin, updateValidators, updateValidationHandler, updateUser);

// Export the router object
module.exports = router;
