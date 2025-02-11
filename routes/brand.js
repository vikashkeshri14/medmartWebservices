const express = require("express");
const brandControllers = require("../controllers/brand");
const Router = express.Router();
Router.post("/getBrandByPagination", brandControllers.getBrandByPagination);
Router.post("/addBrand", brandControllers.addBrand);
Router.post("/updateBrand", brandControllers.updateBrand);

module.exports = Router;
