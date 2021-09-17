const connectdb = (mongoose, uri) => {
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Database has been connected successfully!');
        })
        .catch((err) => {
            console.log(err.message);
            process.exit(1);
        });
};

module.exports = connectdb;
