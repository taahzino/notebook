// Dependencies
const mongoose = require('mongoose');

const checkAccess = (req, res) => {
    const id = req.params.id.length > 0 ? req.params.id : false;
    const { notes } = res.locals.user;
    if (notes.length > 0) {
        console.log(notes.includes(mongoose.Types.ObjectId(id)));
    } else {
        res.status(400).json({
            errors: {
                common: { msg: 'Bad Request' },
            },
        });
    }
};

module.exports = checkAccess;
