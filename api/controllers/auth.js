const {
    User,
    UserAPI
} = require("../models/user");
const    jwt = require("jsonwebtoken"),
    passport = require("passport"),
    settings = require("../settings.json").jwt;

const releaseToken = user => {
    return jwt.sign(
        { 
            id: user.id, nick: user.nick 
        }, 
        settings.secret, 
        { 
            algorithm: "HS512",
            audience: settings.audience,
            issuer: settings.issuer,
            expiresIn: 24 * 60 * 60
        }
    );
};

module.exports = router => {
    
    router.post("/token/mais", (req, res) => {
        passport.authenticate("local", { session: false }, (err, user, info) => {
            if(err) {
                return res.status(400).json({
                    success: false,
                    error: info ? info.message : err.message
                });
            }
            req.login(user, { session: false }, err => {
                if(err) {
                    res.status(400).json({
                        success: false,
                        error: err.message
                    });
                } 
                const token = releaseToken(user);
                return res.json({ success: true, token });
            });
        })(req, res);
    });

    router.put("/user", (req, res) => {
        let user = new User(req.body);
        UserAPI.create(user)
            .then(user => {
                const token = releaseToken(user);
                res.status(200).json({ success: true, token });
            });
    });

    return router;
};