const drugModel = require("../models/drugModel");
module.exports = class projectControllers {
  static getDrugByPagination = async (req, res, next) => {
    let results = [];
    if (
      req.body.hasOwnProperty("key") &&
      req.body.hasOwnProperty("categories") &&
      req.body.hasOwnProperty("sortBy") &&
      req.body.sortBy &&
      req.body.categories.length &&
      req.body.key
    ) {
      results = await drugModel.getDrugByPaginationByAllFilter(req.body);
    } else if (
      req.body.hasOwnProperty("key") &&
      req.body.hasOwnProperty("categories") &&
      req.body.categories.length &&
      req.body.key
    ) {
      results = await drugModel.getDrugByPaginationKeyCat(req.body);
    } else if (
      req.body.hasOwnProperty("sortBy") &&
      req.body.hasOwnProperty("categories") &&
      req.body.categories.length &&
      req.body.sortBy
    ) {
      results = await drugModel.getDrugByPaginationSortCat(req.body);
    } else if (
      req.body.hasOwnProperty("categories") &&
      req.body.categories.length
    ) {
      results = await drugModel.getDrugByPaginationCat(req.body);
    } else {
      results = await drugModel.getDrugByPagination(req.body);
    }

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

  static getDrugById = async (req, res, next) => {
    const results = await drugModel.getDrugById(req.body);

    if (results.length) {
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

  static getrandomDrugByCat = async (req, res, next) => {
    const results = await drugModel.getrandomDrugByCat(req.body);

    if (results.length) {
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
  static getDrugByKey = async (req, res, next) => {
    const results = await drugModel.getDrugByKey(req.body);

    if (results.length) {
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

  static importDrugs = async (req, res, next) => {
    const results = await drugModel.importDrugs(req.body);

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

  static addDrug = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.name && req.body.images.length && req.body.name_ar) {
        const results = await drugModel.addDrug(req.body);
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

  static updateDrug = async (req, res, next) => {
    try {
      if (req.body.name && req.body.name_ar) {
        const results = await drugModel.updateDrug(req.body);
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

  static addHotdeal = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.id) {
        const results = await drugModel.addHotdeal(req.body);
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

  static addBestselling = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.id) {
        const results = await drugModel.addBestselling(req.body);
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

  static removeHotdeal = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.id) {
        const results = await drugModel.removeHotdeal(req.body);
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

  static removeBestselling = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.id) {
        const results = await drugModel.removeBestselling(req.body);
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

  static getBestselling = async (req, res, next) => {
    const results = await drugModel.getBestselling(req.body);
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

  static getHotdeal = async (req, res, next) => {
    const results = await drugModel.getHotdeal(req.body);
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
