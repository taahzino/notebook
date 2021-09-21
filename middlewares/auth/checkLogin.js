// Dependencies
const jwt = require('jsonwebtoken');
const GoogleUser = require('../../models/GoogleUserModel');
const GeneralUser = require('../../models/UserModel');

const checkLogin = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const user = await GoogleUser.findById(req.user);
        res.locals.user = user;
        next();
    } else {
        const token = req.signedCookies[process.env.APP_NAME] || false;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                const user = await GeneralUser.findById(decoded.userId);
                user.password = undefined;
                res.locals.user = user;
                console.log(user);
                next();
            } catch (err) {
                if (!res.locals.HTML) {
                    res.status(401).json({
                        errors: {
                            common: { msg: 'Authentication failure!' },
                        },
                    });
                } else {
                    res.redirect('/login');
                }
            }
        } else if (!res.locals.HTML) {
            res.status(401).json({
                errors: {
                    common: { msg: 'Authentication failure!' },
                },
            });
        } else {
            res.redirect('/login');
        }
    }
};

module.exports = checkLogin;
