const express = require("express");
const config = require("../config.json");
const app = express();
const https = require("https");
const fs = require("fs");
https_options = {
  key: fs.readFileSync("../../ssl/key.key"),
  cert: fs.readFileSync("../../ssl/cert.crt"),
};
app.get("/", (request, response) => {
  response.send("Cześć Świecie!");
});

app.use(express.static(config.API.ContentPath));

module.exports = () => {
  https.createServer(https_options, app).listen(config.API.Port);
};
