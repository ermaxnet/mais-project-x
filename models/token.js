const moment = require("moment");

class Token {
    constructor({ id: key, token: value, updatedAt }) {
        this.key = key;
        this.value = value;
        this.updatedAt = moment(updatedAt);
    }
};
module.exports = Token;