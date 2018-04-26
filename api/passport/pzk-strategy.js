const Strategy = require("passport-strategy").Strategy,
          http = require("http"),
           url = require("url"),
   querystring = require("querystring"),
    connection = require("../settings.json").pzk.connection;

const {
    User,
    UserAPI
} = require("../models/user");

class PzkTokenStrategy extends Strategy {
    constructor() {
        super();
        this.name = "pzk";
        this.connection = url.parse(connection + "Connect/");
        this.options = {
            host: this.connection.host,
            port: 80,
            path: this.connection.path,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            }
        };
    }
    authenticate(req, options) {
        const body = {
            userName: req.body.username,
            password: req.body.password
        };
        UserAPI.find.where({
            username: body.userName
        }).then(user => {
            if(user) {
                return this.success(user, null);
            }
            const request = http.request(this.options, res => {
                let response = "";
                res.on("data", chunk => {
                    response += chunk;
                });
                res.on("end", () => {
                    const apiResponse = JSON.parse(response);
                    if(!apiResponse.success) {
                        return this.error(new Error(apiResponse.error));
                    }
                    const [
                        secondName,
                        firstName,
                        middleName = null
                    ] = apiResponse.fullName.split(" ");
                    const user = new User({
                        id: 0,
                        username: body.userName,
                        first_name: firstName,
                        last_name: secondName,
                        middle_name: middleName,
                        email: apiResponse.email,
                        status_pzk: true,
                        Settings: {
                            avatar: apiResponse.avatar,
                            category: apiResponse.category,
                            businessCategory: apiResponse.businessCategory,
                            tabNumber: apiResponse.inputId
                        },
                        PzkToken: {
                            token: apiResponse.token
                        }
                    });
                    UserAPI.create(user)
                        .then(user => {
                            if(user) {
                                return this.success(user, null);
                            }
                            this.fail({ message: "User is empty!" }, 400);
                        })
                        .catch(err => this.error(err));
                });
            });
            request.on("error", err => {
                this.error(err);
            });
            request.write(querystring.stringify(body));
            request.end();
        });
    }
};

module.exports = PzkTokenStrategy;