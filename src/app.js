const express = require("express");
const routes = require("./routes");
require("./database");

const app = express();
var http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.httpServer = http;
  }

  middlewares() {
    this.server.use(express.json());

    this.server.use((req, res, next) => {
      req.io = io;

      return next();
    });
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
