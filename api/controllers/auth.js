const {
    User,
    UserAPI
} = require("../models/user");
const jwt = require("jsonwebtoken");
const settings = require("../settings.json").jwt;

module.exports = router => {
    
    router.put("/user", (req, res) => {
        let user = new User(req.body);
        UserAPI.create(user)
            .then(user => {
                console.log(user);
                const token = jwt.sign({
                    id: user.id,
                    nick: user.nick
                }, settings.secret, {
                    algorithm: "HS512"
                });
                res.status(200).json({ success: true, token });
            });
    });

    return router;
};