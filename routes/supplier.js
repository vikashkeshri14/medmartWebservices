const express = require("express");
const supplierControllers = require("../controllers/supplier");
const Router = express.Router();
Router.post("/getSupplierById", supplierControllers.getSupplierById);

Router.post("/addSupplier", supplierControllers.addSupplier);

Router.post("/updateSupplier", supplierControllers.updateSupplier);

Router.post(
  "/getSupplierByPagination",
  supplierControllers.getSupplierByPagination
);

module.exports = Router;
