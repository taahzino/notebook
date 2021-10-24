// Dependencies
const bcrypt = require('bcryptjs');

// Modules
const GoogleUser = require('../models/GoogleUserModel');
const UserModel = require('../models/UserModel');

// Controllers
const addUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(200).json({
            message: 'User was added successfully!',
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Unknown error occured!',
                },
            },
        });
    }
};

const getUser = async (req, res, next) => {
    if (res.locals.HTML) {
        next();
    } else {
        const { user } = res.locals;
        res.status(200).json({
            message: 'success',
            result: user,
        });
    }
};

const updateUser = async (req, res, next) => {
    const { user, fields } = res.locals;
    if (user.userType === 'googleUser') {
        let doc = await GoogleUser.findByIdAndUpdate(user._id, fields, { new: true });
        doc = doc.toObject();
        if (res.locals.HTML) {
            res.locals.user = doc;
            next();
        } else {
            res.status(200).json({
                message: 'User has been updated successfully!',
                result: doc,
            });
        }
    } else {
        let doc = await UserModel.findByIdAndUpdate(user._id, fields, { new: true });
        doc = doc.toObject();
        delete doc.password;
        if (res.locals.HTML) {
            res.locals.user = doc;
            next();
        } else {
            res.status(200).json({
                message: 'User has been updated successfully!',
                result: doc,
            });
        }
    }
};

module.exports = {
    addUser,
    getUser,
    updateUser,
};
