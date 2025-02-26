const express = require("express");
const cityControllers = require("../controllers/city");
const Router = express.Router();
Router.post("/getCityById", cityControllers.getCityById);

Router.post("/addCity", cityControllers.addCity);

Router.post("/updateCity", cityControllers.updateCity);

Router.post("/getCityByPagination", cityControllers.getCityByPagination);

module.exports = Router;
