const express = require("express");
const userControllers = require("../controllers/user");
const Router = express.Router();
Router.post("/login", userControllers.login);
Router.post("/getUserById", userControllers.getUserById);
Router.post("/addcontact", userControllers.addcontact);
Router.post("/subscribe", userControllers.subscribe);
Router.post("/registration", userControllers.registration);
Router.post("/updateUser", userControllers.updateUser);
Router.post("/updateAddress", userControllers.updateAddress);
Router.post("/getAddress", userControllers.getAddress);
Router.post("/checkPhone", userControllers.checkPhone);
Router.post("/checkEmail", userControllers.checkEmail);
Router.post("/checkWhatsaap", userControllers.checkWhatsaap);
Router.post("/changePassword", userControllers.changePassword);

module.exports = Router;
