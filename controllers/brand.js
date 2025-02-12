const brandModel = require("../models/brandModel");
module.exports = class brandControllers {
  static getBrandByPagination = async (req, res, next) => {
    const results = await brandModel.getBrandByPagination(req.body);
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

  static getBrandById = async (req, res, next) => {
    const results = await brandModel.getBrandById(req.body);
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
  static addBrand = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.name && req.body.images.length && req.body.name_ar) {
        const results = await brandModel.addBrand(req.body);

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

  static updateBrand = async (req, res, next) => {
    try {
      if (req.body.name && req.body.name_ar && req.body.id) {
        const results = await brandModel.updateBrand(req.body);

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
};
