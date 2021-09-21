const noteValidation = (req, res, next) => {
    const title =
        typeof req.body.title === 'string' && req.body.title.trim().length > 0
            ? req.body.title
            : false;
    const content =
        typeof req.body.content === 'string' && req.body.content.trim().length > 0
            ? req.body.content
            : false;

    if (title || content) {
        next();
    } else {
        res.status(400).json({
            errors: {
                common: { msg: 'Nothing to save' },
            },
        });
    }
};

module.exports = {
    noteValidation,
};
