const serveNotes = (req, res) => {
    const { allNotes } = res.locals;
    const pinned = [];
    const unpinned = [];
    allNotes.forEach((note) => {
        if (note.pinned === true) {
            pinned.push(note);
        } else {
            unpinned.push(note);
        }
    });
    res.status(200).json({
        message: 'success',
        result: {
            notes: { pinned, unpinned },
        },
    });
};

module.exports = {
    serveNotes,
};
