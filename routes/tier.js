const express = require("express");
const tierControllers = require("../controllers/tier");
const Router = express.Router();

Router.post("/addTier", tierControllers.addTier);

Router.post("/updateTier", tierControllers.updateTier);

Router.post("/getTierByPagination", tierControllers.getTierByPagination);

module.exports = Router;
