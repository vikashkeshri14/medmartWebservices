const express = require("express");
const adminControllers = require("../controllers/admin");
const Router = express.Router();

Router.post("/login", adminControllers.loginAdmin);

module.exports = Router;
