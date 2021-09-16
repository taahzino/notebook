// Dependencies
const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const token = req.signedCookies[process.env.APP_NAME] || false;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            res.locals.user = decoded;
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
};

module.exports = checkLogin;
