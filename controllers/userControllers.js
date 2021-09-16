// Dependencies
const bcrypt = require('bcryptjs');

// Modules
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

module.exports = {
    addUser,
};
