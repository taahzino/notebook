/* eslint-disable no-useless-escape */
function isPlainString(string) {
    const regex = /[$-/:-?{-~!"^_`\[\]]/i;
    return !regex.test(String(string).toLowerCase());
}

module.exports = isPlainString;
