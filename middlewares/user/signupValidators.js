// Dependencies
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');

// Modules
const UserModel = require('../../models/UserModel');

// Temporary things
const fields = {};

const signupValidators = [
    check('firstname')
        .isString()
        .isLength({ min: 1 })
        .withMessage('Firstname & Lastname both are required!')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Firstname must not contain anything other than alphabet')
        .trim(),
    check('lastname')
        .isString()
        .isLength({ min: 1 })
        .withMessage('Firstname & Lastname both are required!')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Lastname must not contain anything other than alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (value) => {
            try {
                const user = await UserModel.findOne({ email: value });
                if (user && user.email === value) {
                    throw createError('Email already in use');
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long')
        .custom((value) => {
            fields.pass1 = value;
            return true;
        })
        .trim(),
    check('password2')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long')
        .custom((value) => {
            if (value !== fields.pass1) {
                throw createError('Passwords do not match!');
            } else {
                return true;
            }
        })
        .trim(),
];

const signupvalidationHandler = (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length === 0) {
        next();
    } else {
        res.status(400).json({
            errors,
        });
    }
};

module.exports = { signupValidators, signupvalidationHandler };
