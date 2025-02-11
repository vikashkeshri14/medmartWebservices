const express = require("express");
const brandControllers = require("../controllers/brand");
const Router = express.Router();
Router.post("/getBrandByPagination", brandControllers.getBrandByPagination);

module.exports = Router;
