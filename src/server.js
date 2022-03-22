const compression = require("compression");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const chalk = require("chalk");

const app = express();
const teal500 = chalk.hex("#009688");
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;
const user = process.env.BASIC_USER;
const pass = process.env.BASIC_PASS;

if (user && pass) {
  app.use(express.basicAuth(user, pass));
}

// app.use(express.logger("dev"));
// enable compress
// app.use(compression());
// // get our app to use body parser
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("dist"));

app.listen(PORT, HOST, () => {
  console.log(teal500("🚀  App: Bootstrap Succeeded"));
  console.log(teal500(`🚀  Host: http://${HOST}:${PORT}`));
  console.log(teal500(`"Static dir: ${__dirname}`));
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
