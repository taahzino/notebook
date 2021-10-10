const NotesModel = require('../models/NotesModel');

const update = async () => {
    const notes = await NotesModel.find({});
    notes.forEach((note) => {
        NotesModel.findOne({ _id: note._id }, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                doc.set('category', undefined, { strict: false });
                doc.save();
            }
        });
    });
};

module.exports = update;
