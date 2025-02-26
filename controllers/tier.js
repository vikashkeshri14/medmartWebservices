const express = require("cors");
const tierModel = require("../models/tierModel");
module.exports = class tierControllers {
  static addTier = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.name && req.body.type) {
        const results = await tierModel.addTier(req.body);

        if (results) {
          const obj = {
            message: "Successfully Added ",
            results: "added",
            status: true,
          };
          res.status(200).json(obj);
        } else {
          const obj = {
            message: "Please try again",
            result: [],
            status: false,
          };
          //console.log(obj);
          res.status(200).json(obj);
        }
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };

  static updateTier = async (req, res, next) => {
    try {
      if (req.body.name && req.body.type && req.body.id) {
        console.log(res.body);
        const results = await tierModel.updateTier(req.body);

        if (results) {
          const obj = {
            message: "Successfully Updated ",
            results: "added",
            status: true,
          };
          res.status(200).json(obj);
        } else {
          const obj = {
            message: "Please try again",
            result: [],
            status: false,
          };
          //console.log(obj);
          res.status(200).json(obj);
        }
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };

  static getTierByPagination = async (req, res, next) => {
    const results = await tierModel.getTierByPagination(req.body);
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

  static getTierById = async (req, res, next) => {
    const results = await tierModel.getTierById(req.body);
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
