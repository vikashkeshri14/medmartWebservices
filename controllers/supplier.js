const express = require("cors");
const supplierModel = require("../models/supplierModel");
module.exports = class supplierControllers {
  static addSupplier = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (
        req.body.name &&
        req.body.name_ar &&
        req.body.password &&
        req.body.phone &&
        req.body.updated_by
      ) {
        const results = await supplierModel.addSupplier(req.body);

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

  static updateSupplier = async (req, res, next) => {
    try {
      if (req.body.name && req.body.id) {
        //console.log(res.body);
        const results = await supplierModel.updateSupplier(req.body);

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

  static getSupplierByPagination = async (req, res, next) => {
    const results = await supplierModel.getSupplierByPagination(req.body);
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

  static getSupplierById = async (req, res, next) => {
    const results = await supplierModel.getSupplierById(req.body);
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
