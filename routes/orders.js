const express = require("express");
const orderControllers = require("../controllers/orders");
const Router = express.Router();

Router.post("/addOrder", orderControllers.addOrder);
Router.post("/getOrderById", orderControllers.getOrderById);
Router.post("/getOrderByUserId", orderControllers.getOrderByUserId);
Router.post("/getAllOrder", orderControllers.getAllOrder);
Router.post("/getOrderByToken", orderControllers.getOrderByToken);

module.exports = Router;
