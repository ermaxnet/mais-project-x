const Strategy = require("passport-strategy").Strategy,
          http = require("http"),
           url = require("url"),
   querystring = require("querystring"),
    connection = require("../settings.json").pzk.connection,
         sharp = require("sharp");

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
    processImage(imageBase64) {
        if(!imageBase64) {
            return Promise.resolve(null);
        }
        const imageBuffer = Buffer.from(imageBase64, "base64");
        const maskBuffer = new Buffer(
            `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100">
                <path d="M0,50v50h50C22.4,100,0,77.6,0,50z" fill="transparent"/>
                <path d="M50,0H0v50C0,22.4,22.4,0,50,0z" fill="transparent"/>
                <path d="M50,100h50V50C100,77.6,77.6,100,50,100z" fill="transparent"/>
                <path d="M50,0c27.6,0,50,22.4,50,50V0H50z" fill="transparent"/>
            </svg>`
        );
        return sharp(imageBuffer)
            .resize(200, 200).overlayWith(maskBuffer)
            .jpeg({ quality: 90 }).toBuffer()
            .then(data => data.toString("base64"));
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
                        last_name,
                        first_name,
                        middle_name = null
                    ] = apiResponse.fullName.split(" ");
                    const user = new User({
                        id: 0,
                        username: body.userName,
                        first_name,
                        last_name,
                        middle_name,
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
                    this.processImage(user.settings.avatar)
                        .then(avatar => {
                            user.settings.avatar = avatar;
                            return UserAPI.create(user);    
                        })
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