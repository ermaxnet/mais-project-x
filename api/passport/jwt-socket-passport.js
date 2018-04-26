const passport = require("passport");

module.exports = (socket, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if(user) {
            socket.request.user = user;
            return next();
        }
        if(err) { return next(err); }
        next(new Error(
            info ? info.message : "Invalid JWT tocken. Connection will close..."
        ));
    })(socket.request);
};