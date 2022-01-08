const HttpServer = require('./Actions/api');
const BackgroundServer = require("./Actions/sheduler");

BackgroundServer();
HttpServer();