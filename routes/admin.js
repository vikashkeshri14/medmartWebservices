const express = require("express");
const adminControllers = require("../controllers/admin");
const Router = express.Router();

Router.post("/login", adminControllers.loginAdmin);
Router.post("/getAdminListPagination", adminControllers.getAdminListPagination);
Router.post("/addAdmin", adminControllers.addAdmin);
Router.post("/updateAdmin", adminControllers.updateAdmin);
Router.post("/checkPhone", adminControllers.checkPhone);

Router.post("/checkEmail", adminControllers.checkEmail);

module.exports = Router;
