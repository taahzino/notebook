const decorate = (req, res, next) => {
    res.locals.HTML = true;
    res.locals.APP_NAME = process.env.APP_NAME;
    next();
};

module.exports = decorate;
