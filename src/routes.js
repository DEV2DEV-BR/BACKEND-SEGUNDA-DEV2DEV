const { Router } = require("express");
const UserController = require("./apps/controllers/UserController");
const MessageController = require("./apps/controllers/MessageController");

const routes = new Router();


routes.get("/health", (req, res) => {
  return res.send({ message: "Connect Success" });
});


routes.post("/user", UserController.insert);
routes.get("/user/:id", UserController.getUser);
routes.get("/users", UserController.getAllUsers);

routes.post("/message/:userId", MessageController.sendMessage);
routes.get("/messages", MessageController.listAllMessages);

module.exports = routes;
