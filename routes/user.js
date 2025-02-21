const express = require("express");
const userControllers = require("../controllers/user");
const Router = express.Router();
Router.post("/login", userControllers.login);
Router.post("/addcontact", userControllers.addcontact);
Router.post("/subscribe", userControllers.subscribe);
Router.post("/registration", userControllers.registration);
Router.post("/checkPhone", userControllers.checkPhone);
Router.post("/checkEmail", userControllers.checkEmail);
Router.post("/checkWhatsaap", userControllers.checkWhatsaap);
Router.post("/changePassword", userControllers.changePassword);

module.exports = Router;
