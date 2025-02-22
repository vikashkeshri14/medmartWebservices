const orderModel = require("../models/orderModel");
module.exports = class ordersControllers {
  static addOrder = async (req, res, next) => {
    try {
      const results = await orderModel.addOrder(req.body);
      if (results.insertId) {
        let orderItems = req.body.itemDetails;
        await Promise.all(
          orderItems.map(async (data) => {
            await orderModel.addOrderItems(results.insertId, data);
          })
        );
      }
      const obj = { result: results, success: true, status: 200 };
      res.status(200).json(obj);
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };

  static getAllOrder = async (req, res, next) => {
    const results = await orderModel.getAllOrder(req.body);
    if (results) {
      const obj = {
        message: "Data fetch successfully",
        results: results,
        status: true,
      };
      res.status(200).json(obj);
    } else {
      const obj = {
        message: "No data",
        results: [],
        status: false,
      };
      res.status(200).json(obj);
    }
  };

  static getOrderById = async (req, res, next) => {
    const results = await orderModel.getOrderById(req.body);
    if (results) {
      const obj = {
        message: "Data fetch successfully",
        results: results,
        status: true,
      };
      res.status(200).json(obj);
    } else {
      const obj = {
        message: "No data",
        results: [],
        status: false,
      };
      res.status(200).json(obj);
    }
  };
  static getOrderByToken = async (req, res, next) => {
    const results = await orderModel.getOrderByToken(req.body);
    if (results) {
      const obj = {
        message: "Data fetch successfully",
        results: results,
        status: true,
      };
      res.status(200).json(obj);
    } else {
      const obj = {
        message: "No data",
        results: [],
        status: false,
      };
      res.status(200).json(obj);
    }
  };

  static getOrderByUserId = async (req, res, next) => {
    const results = await orderModel.getOrderByUserId(req.body);
    if (results) {
      const obj = {
        message: "Data fetch successfully",
        results: results,
        status: true,
      };
      res.status(200).json(obj);
    } else {
      const obj = {
        message: "No data",
        results: [],
        status: false,
      };
      res.status(200).json(obj);
    }
  };
};
