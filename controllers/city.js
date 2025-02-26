const express = require("cors");
const cityModel = require("../models/cityModel");
module.exports = class cityControllers {
  static addCity = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.name && req.body.governate && req.body.name_ar) {
        const results = await cityModel.addCity(req.body);

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

  static updateCity = async (req, res, next) => {
    try {
      if (req.body.name && req.body.governate && req.body.name_ar) {
        const results = await cityModel.updateCity(req.body);

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

  static getCityByPagination = async (req, res, next) => {
    const results = await cityModel.getCityByPagination(req.body);
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

  static getCityById = async (req, res, next) => {
    const results = await cityModel.getCityById(req.body);
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
