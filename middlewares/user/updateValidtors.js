// Modules
const GeneralUser = require('../../models/UserModel');
const GoogleUser = require('../../models/GoogleUserModel');
const isEmail = require('../../utils/isEmail');
const isEmailAvailable = require('../../utils/isEmailAvailable');
const isPlainString = require('../../utils/isPlainString');

const updateValidators = async (req, res, next) => {
    const { user } = res.locals;
    const errors = {};
    const fields = {};
    let { firstname, lastname, email } = req.body;
    if (firstname || lastname || email) {
        if (firstname) {
            firstname = firstname.trim().length > 0 ? firstname.trim() : false;
            if (firstname) {
                if (firstname === user.firstname) {
                    errors.firstname = {
                        nochange: true,
                        msg: 'No change!',
                    };
                } else if (!isPlainString(firstname)) {
                    errors.firstname = {
                        msg: 'Firstname must not contain anything other than alphabet!',
                    };
                } else {
                    fields.firstname = firstname;
                }
            } else {
                errors.firstname = {
                    msg: 'Firstname is required!',
                };
            }
        }
        if (lastname) {
            lastname = lastname.trim().length > 0 ? lastname.trim() : false;
            if (lastname) {
                if (lastname === user.lastname) {
                    errors.lastname = {
                        nochange: true,
                        msg: 'No change!',
                    };
                } else if (!isPlainString(lastname)) {
                    errors.lastname = {
                        msg: 'Lastname must not contain anything other than alphabet!',
                    };
                } else {
                    fields.lastname = lastname;
                }
            } else {
                errors.lastname = {
                    msg: 'Lastname is required!',
                };
            }
        }
        if (email) {
            email = email.trim().length > 0 ? email.trim() : false;
            if (email === user.email) {
                errors.email = {
                    nochange: true,
                    msg: 'No change!',
                };
            } else if (!isEmail(email)) {
                errors.email = {
                    msg: 'Invalid email address!',
                };
            } else if (!(await isEmailAvailable([GeneralUser, GoogleUser], email))) {
                errors.email = {
                    msg: 'Email Already in use!',
                };
            } else {
                fields.email = email;
            }
        }
        res.locals.errors = errors;
        res.locals.fields = fields;
        next();
    } else {
        res.status(400).json({
            errors: {
                common: { msg: 'Nothing to change!' },
            },
        });
    }
};

const updateValidationHandler = (req, res, next) => {
    const { errors } = res.locals;

    if (Object.keys(errors).length === 0) {
        next();
    } else {
        res.status(400).json({
            errors,
        });
    }
};

module.exports = {
    updateValidators,
    updateValidationHandler,
};
