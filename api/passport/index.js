const       passport = require("passport"),
       LocalStrategy = require("passport-local").Strategy,
         JwtStrategy = require("passport-jwt").Strategy,
            settings = require("../settings.json").jwt;

const { UserAPI } = require("../models/user");

const extractJwtFromCookie = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["bearer"];
    }
    return token;
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserAPI.find.byId(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});

passport.use(new LocalStrategy(
    {
        session: false
    },
    (username, password, done) => {
        UserAPI.find.where({ username })
            .then(user => {
                if(!user) { return done(null, false); }
                return Promise.all([
                    UserAPI.validatePassword(password, user.hash),
                    Promise.resolve(user)
                ]);
            })
            .then(([ isMatch, user ]) => {
                if(isMatch) { return done(null, user); }
                return done(null, false);
            })
            .catch(err => done(err));
    }
));

passport.use(new JwtStrategy(
    {
        jwtFromRequest: extractJwtFromCookie,
        secretOrKey: settings.secret,
        issuer: settings.issuer,
        audience: settings.audience
    },
    (jwt_payload, done) => {
        UserAPI.find.byId(jwt_payload.id)
            .then(user => {
                user 
                    ? done(null, user) 
                    : done(null, false);
            })
            .catch(err => done(err));
    }
));

module.exports = passport;