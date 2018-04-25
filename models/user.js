const Settings = require("./settings"),
         Token = require("./token"),
      STATUSES = require("../constants").STATUSES;

class User {
    constructor({ 
        id, 
        username, 
        hash,
        first_name, 
        last_name,
        middle_name, 
        email, 
        status_pzk, 
        status_mais, 
        Settings: settings = {}, 
        MaisToken: maisToken = {}, 
        PzkToken: pzkToken = {} 
    }) {
        this.id = id;
        this.nick = username;
        this.hash = hash;
        this.firstName = first_name;
        this.lastName = last_name;
        this.middleName = middle_name;
        this.email = email;
        this.statusPzkCode = status_pzk;
        this.statusMaisCode = status_mais;
        this.settings = new Settings(settings);
        this.maisToken = new Token(maisToken);
        this.pzkToken = new Token(pzkToken);
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    get statusPzk() {
        return STATUSES[this.statusPzkCode];
    }
    get statusMais() {
        return STATUSES[this.statusMaisCode];
    }
    get displayName() {
        return this.settings.displayName
            ? this.settings.displayName
            : this.fullName;
    }
};
module.exports = User;