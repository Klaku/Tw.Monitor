const express = require('express');
const config = require('../config.json');
const app = express();

app.get('/', (request, response) => {
    response.send("Cześć Świecie!");
});

app.use(express.static(config.API.ContentPath));

module.exports = () => {
    app.listen(config.API.Port);
}