// Dependencies
const express = require('express');

// Create express router
const router = express.Router();

// Middlewares
const {
    loginValidators,
    loginvalidationHandler,
} = require('../../middlewares/user/loginValidators');

// Controllers
const { doLogin } = require('../../controllers/loginControllers');

// Handle requests
router.post('/', loginValidators, loginvalidationHandler, doLogin);

// Export the router object
module.exports = router;
