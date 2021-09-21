// Dependencies
const express = require('express');

// Create express router
const router = express.Router();

// Middlewares
const {
    loginValidators,
    loginvalidationHandler,
} = require('../../middlewares/user/loginValidators');
const checkLogin = require('../../middlewares/auth/checkLogin');

// Controllers
const { doLogin, doLogout } = require('../../controllers/loginControllers');

// let user login
router.post('/', loginValidators, loginvalidationHandler, doLogin);

// let user logout
router.delete('/', checkLogin, doLogout);

// Export the router object
module.exports = router;
