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
        status, 
        Settings: settings = {}, 
        MaisToken: maisToken = {}, 
        PzkToken: pzkToken = {} 
    }) {
        this.id = id;
        this.username = username;
        this.hash = hash;
        this.first_name = first_name;
        this.last_name = last_name;
        this.middle_name = middle_name;
        this.email = email;
        this.status_pzk = status_pzk;
        this.status_mais = status_mais;
        this.status = status;
        this.settings = new Settings(settings);
        this.maisToken = new Token(maisToken);
        this.pzkToken = new Token(pzkToken);
    }
    get full_name() {
        return `${this.first_name} ${this.last_name}`;
    }
    get statusName() {
        return STATUSES[this.status];
    }
    get displayName() {
        return this.settings.displayName
            ? this.settings.displayName
            : this.full_name;
    }
};
module.exports = User;