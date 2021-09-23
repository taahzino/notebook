const checkAccess = (req, res, next) => {
    const id = req.params.id.length > 0 ? req.params.id : false;
    const { notes } = res.locals.user;
    if (id) {
        if (typeof notes === 'object' && notes instanceof Array && notes.includes(id)) {
            next();
        } else {
            res.status(403).json({
                errors: {
                    common: { msg: 'You do not have access to this resource!' },
                },
            });
        }
    } else {
        res.status(400).json({
            errors: {
                common: { msg: 'Bad request' },
            },
        });
    }
};

module.exports = checkAccess;
