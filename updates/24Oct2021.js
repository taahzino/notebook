const UserModel = require('../models/UserModel');

const update = async () => {
    const users = await UserModel.find({});
    users.forEach((user) => {
        UserModel.findOne({ _id: user._id }, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                doc.set('lastpasschanged', user.createdAt);
                doc.save();
                console.log(`Done with ${user._id}`);
            }
        });
    });
};

update();
// console.log(new Date());

module.exports = update;
