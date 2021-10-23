/**
 * Credit:
 * https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 */

const isUrl = (string) => {
    let url;

    try {
        url = new URL(string);
    } catch (err) {
        return false;
    }

    return url;
};

module.exports = isUrl;
