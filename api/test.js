const connection = require("./settings.json").pzk.connection;
const http = require("http");
const url = require("url");
const querystring = require("querystring");

const u = url.parse(connection + "Connect/");
console.log(u.path);

const options = {
    host: u.host,
    port: 80,
    path: u.path,
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    }
};

const user = {
    userName: "Eremin_MY",
    password: "VegasmaN17FacebooK111"
};

const req = http.request(options, res => {
    let response = "";
    res.on("data", chunk => {
        response += chunk;
    });
    res.on("end", () => {
        console.log(JSON.parse(response));
    });
});

req.on("error", err => {
    console.error(err.message);
});

req.write(querystring.stringify(user));
req.end();