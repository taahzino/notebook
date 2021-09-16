// Dependencies
const { check, validationResult } = require('express-validator');
// const createError = require('http-errors');
const bcrypt = require('bcryptjs');

// Modules
const UserModel = require('../../models/UserModel');

const loginValidators = [
    check('email').isEmail().withMessage('Invalid email address!'),
    check('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 chars long'),
];

const loginvalidationHandler = async (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length === 0) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (user && user.email === email) {
                const isMatched = await bcrypt.compare(password, user.password);
                if (isMatched) {
                    res.locals.user = {
                        userId: user._id,
                        email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                    };
                    next();
                } else {
                    res.status(401).json({
                        errors: {
                            common: { msg: 'Credentials do not match' },
                        },
                    });
                }
            } else {
                res.status(401).json({
                    errors: {
                        common: { msg: 'Credentials do not match' },
                    },
                });
            }
        } catch {
            res.status(500).json({
                errors: {
                    common: { msg: 'Internal server error' },
                },
            });
        }
    } else {
        res.status(400).json({
            errors,
        });
    }
};

module.exports = {
    loginValidators,
    loginvalidationHandler,
};
