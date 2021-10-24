/* eslint-disable no-await-in-loop */

const isEmailAvailable = async (models, email) => {
    let doc;
    let isAvailable = true;
    for (let i = 0; i < models.length; i += 1) {
        doc = await models[i].findOne({ email });
        if (doc !== null) {
            isAvailable = false;
            break;
        } else {
            isAvailable = true;
        }
    }
    return JSON.parse(isAvailable);
};

module.exports = isEmailAvailable;
