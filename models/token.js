const moment = require("moment");

class Token {
    constructor({ id, token, updatedAt }) {
        this.id = id;
        this.token = token;
        this.updatedAt = moment(updatedAt);
    }
};
module.exports = Token;