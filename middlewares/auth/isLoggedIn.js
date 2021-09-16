// Dependencies
const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    const token = req.signedCookies[process.env.APP_NAME] || false;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            res.locals.user = decoded;
            res.redirect('/');
        } catch (err) {
            next();
        }
    } else {
        next();
    }
};

module.exports = isLoggedIn;
