const express = require("express");
const userControllers = require("../controllers/user");
const Router = express.Router();

Router.post("/addcontact", userControllers.addcontact);
Router.post("/subscribe", userControllers.subscribe);
module.exports = Router;
