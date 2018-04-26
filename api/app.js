const            http = require("http"),
              express = require("express"),
           bodyParser = require("body-parser"),
         cookieParser = require("cookie-parser"),
                 cors = require("cors"),
        { sequelize } = require("./database"),
             passport = require("./passport"),
         attachSocket = require("./socket");
const {
    User,
    UserAPI
} = require("./models/user");

const app = express();
app.set("port", process.env.PORT || 8002);
app.set("json spaces", 40);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors({
    origin: "http://127.0.0.3",
    credentials: true
}));
app.use("/auth", require("./controllers/auth")(express.Router()))
app.use("/user", passport.authenticate("jwt", { session: false }), require("./controllers/user")(express.Router()));
app.use((req, res, next) => {
    res.status(404).json({ success: false, error: "Not Supported Request" });
});
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, error: err.message });
});

sequelize
    .authenticate()
    .then(() => sequelize.sync())
    .then(() => {
        const server = http.createServer(app);
        attachSocket(server).listen(app.get("port"), () => {
            console.log(`Serving: localhost ${app.get("port")}`);
        });
    })
    .catch(err => console.error(err));
