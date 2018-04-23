const       passport = require("passport"),
       LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(
    {
        session: false
    },
    (username, password, done) => {
        
    }
));