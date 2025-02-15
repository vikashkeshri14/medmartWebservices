const express = require("express");
const drugControllers = require("../controllers/drug");
const Router = express.Router();

Router.post("/addDrug", drugControllers.addDrug);
Router.post("/updateDrug", drugControllers.updateDrug);

Router.post("/getDrugByPagination", drugControllers.getDrugByPagination);

Router.post("/importDrugs", drugControllers.importDrugs);
Router.post("/getDrugById", drugControllers.getDrugById);

Router.post("/getDrugByKey", drugControllers.getDrugByKey);

Router.post("/addHotdeal", drugControllers.addHotdeal);

Router.post("/removeHotdeal", drugControllers.removeHotdeal);

Router.post("/getHotdeal", drugControllers.getHotdeal);

Router.post("/addBestselling", drugControllers.addBestselling);

Router.post("/removeBestselling", drugControllers.removeBestselling);

Router.post("/getBestselling", drugControllers.getBestselling);

module.exports = Router;
