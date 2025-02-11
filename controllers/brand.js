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
};
