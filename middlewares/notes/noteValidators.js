const createNoteValidation = (req, res, next) => {
    const title =
        typeof req.body.title === 'string' && req.body.title.trim().length > 0
            ? req.body.title.trim()
            : false;
    const content =
        typeof req.body.content === 'string' && req.body.content.trim().length > 0
            ? req.body.content
            : false;
    const category =
        typeof req.body.category === 'string' && req.body.category.trim().length > 0
            ? req.body.category.trim()
            : 'uncategorized';
    if (title || content) {
        res.locals.note = {
            title,
            content,
            category,
        };
        next();
    } else {
        res.status(400).json({
            errors: {
                common: { msg: 'Nothing to save' },
            },
        });
    }
};

const updateNoteValidation = (req, res, next) => {
    const title =
        typeof req.body.title === 'string' && req.body.title.trim().length > 0
            ? req.body.title.trim()
            : false;
    const content =
        typeof req.body.content === 'string' && req.body.content.trim().length > 0
            ? req.body.content
            : false;
    const category =
        typeof req.body.category === 'string' && req.body.category.trim().length > 0
            ? req.body.category.trim()
            : false;
    res.locals.note = {
        title,
        content,
        category,
    };
    next();
};

module.exports = {
    createNoteValidation,
    updateNoteValidation,
};
