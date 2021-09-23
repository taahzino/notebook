// Dependencies
const GeneralUser = require('../models/UserModel');
const GoogleUser = require('../models/GoogleUserModel');
const NotesModel = require('../models/NotesModel');

const saveNote = async (req, res) => {
    try {
        const { user } = res.locals;
        const newNote = new NotesModel(res.locals.note);
        const note = await newNote.save();
        if (user.userType === 'generalUser') {
            await GeneralUser.updateOne(
                {
                    _id: user._id,
                },
                {
                    $push: {
                        notes: note._id,
                    },
                }
            );
        }
        if (user.userType === 'googleUser') {
            await GoogleUser.updateOne(
                {
                    _id: user._id,
                },
                {
                    $push: {
                        notes: note._id,
                    },
                }
            );
        }
        res.status(200).json({
            message: 'Note has been saved!',
            note,
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: { msg: 'Internal server error!' },
            },
        });
    }
};

const getANote = async (req, res) => {
    try {
        const note = await NotesModel.findById(req.params.id);
        res.status(200).json({
            result: { note },
            message: 'success',
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: { msg: 'Internal Server Error' },
            },
        });
    }
};

const getAllNotes = (req, res) => {
    GeneralUser.find({
        _id: res.locals.user._id,
    })
        .populate('notes', '')
        .select({
            __v: 0,
            password: 0,
        })
        .exec((err, users) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    errors: {
                        common: { msg: 'Internal server error!' },
                    },
                });
            } else {
                res.status(200).json({
                    message: 'success',
                    result: {
                        notes: users[0].notes,
                    },
                });
            }
        });
};

const updateANote = async (req, res) => {
    try {
        const { user } = res.locals;
        const { note } = res.locals;
        const { id } = req.params;
        if (note.title || note.content || note.category) {
            if (!note.title) {
                note.title = '';
            }
            if (!note.content) {
                note.content = '';
            }
            if (!note.category) {
                note.category = '';
            }
            const updated = await NotesModel.findByIdAndUpdate(id, note, { new: true });
            res.status(200).json({
                message: 'Note has been updated successfully',
                result: {
                    note: updated,
                },
            });
        } else {
            await NotesModel.findByIdAndDelete(id);
            if (user.userType === 'generalUser') {
                await GeneralUser.updateOne(
                    {
                        _id: user._id,
                    },
                    {
                        $pull: {
                            notes: req.params.id,
                        },
                    }
                );
            }
            if (user.userType === 'googleUser') {
                await GoogleUser.updateOne(
                    {
                        _id: user._id,
                    },
                    {
                        $pull: {
                            notes: req.params.id,
                        },
                    }
                );
            }
            res.status(200).json({
                message: 'Empty note deleted',
                deleted: true,
            });
        }
    } catch (err) {
        res.status(500).json({
            errors: {
                common: { msg: 'Internal Server Error' },
            },
        });
    }
};

const deleteANote = async (req, res) => {
    try {
        const { user } = res.locals;
        await NotesModel.findByIdAndDelete(req.params.id);
        if (user.userType === 'generalUser') {
            await GeneralUser.updateOne(
                {
                    _id: user._id,
                },
                {
                    $pull: {
                        notes: req.params.id,
                    },
                }
            );
        }
        if (user.userType === 'googleUser') {
            await GoogleUser.updateOne(
                {
                    _id: user._id,
                },
                {
                    $pull: {
                        notes: req.params.id,
                    },
                }
            );
        }
        res.status(200).json({
            message: 'Note has been deleted!',
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: { msg: 'Internal Server Error' },
            },
        });
    }
};

const deleteAllNotes = async (req, res) => {
    try {
        const { user } = res.locals;
        if (user.notes.length > 0) {
            await NotesModel.deleteMany({
                _id: { $in: user.notes },
            });
            if (user.userType === 'generalUser') {
                await GeneralUser.findByIdAndUpdate(user._id, {
                    notes: [],
                });
            }
            if (user.userType === 'googleUser') {
                await GoogleUser.findByIdAndUpdate(user._id, {
                    notes: [],
                });
            }
        }
        res.status(200).json({
            message: 'Notes have been deleted!',
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: { msg: 'Internal Server Error' },
            },
        });
    }
};

module.exports = {
    saveNote,
    getANote,
    getAllNotes,
    updateANote,
    deleteANote,
    deleteAllNotes,
};
