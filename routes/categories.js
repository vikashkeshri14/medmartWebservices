const express = require("express");
const categoriesControllers = require("../controllers/categories");
const Router = express.Router();
Router.post(
  "/getCategoryByPagination",
  categoriesControllers.getCategoryByPagination
);
Router.post("/addCategory", categoriesControllers.addCategory);
Router.post("/updateCategory", categoriesControllers.updateCategory);
Router.post("/getCategoryById", categoriesControllers.getCategoryById);
Router.get("/getCategory", categoriesControllers.getCategory);
Router.get(
  "/getCategoryWithDrugCount",
  categoriesControllers.getCategoryWithDrugCount
);
module.exports = Router;
