const serveNotes = (req, res) => {
    res.status(200).json({
        message: 'success',
        result: res.locals.result,
    });
};

module.exports = {
    serveNotes,
};
