const            http = require("http"),
              express = require("express"),
           bodyParser = require("body-parser"),
                 cors = require("cors"),
        { sequelize } = require("./database");
const {
    User,
    UserAPI
} = require("./models/user");

const app = express();
app.set("port", process.env.PORT || 8002);
app.set("json spaces", 40);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use("/", require("./controllers/auth")(express.Router()))

sequelize
    .authenticate()
    .then(() => sequelize.sync())
    .then(() => {
        http.createServer(app).listen(app.get("port"), () => {
            console.log(`Serving: localhost ${app.get("port")}`);
        });
    })
    .catch(err => console.error(err));
