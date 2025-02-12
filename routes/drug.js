const express = require("express");
const drugControllers = require("../controllers/drug");
const Router = express.Router();

Router.post("/getCategoriesByPagination", drugControllers.getDrugByPagination);

Router.post("/importDrugs", drugControllers.importDrugs);
Router.post("/getDrugById", drugControllers.getDrugById);

module.exports = Router;
