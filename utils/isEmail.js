/* eslint-disable no-useless-escape */
/**
 *
 * Credit:
 * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 */
function isEmail(email) {
    const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(String(email).toLowerCase());
}

module.exports = isEmail;
