const express = require('express');
const routes = require('./routes');
require("./database");

const application = express();
var server = require('http').Server(application);
const io = require('socket.io')(server);
const cors = require('cors');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.httpServer = server;
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

module.exports = new App().httpServer;
