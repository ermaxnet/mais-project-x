const      http = require("http"),
        express = require("express"),
    serveStatic = require("serve-static"),
           path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(serveStatic(path.join(__dirname, "../public")));
app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

http.createServer(app).listen(app.get("port"), () => {
    console.log(`Serving: localhost ${app.get("port")}`);
});