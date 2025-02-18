const express = require("cors");
const adminModel = require("../models/adminModel");
module.exports = class userControllers {
  static getAdminById = async (req, res, next) => {
    const results = await adminModel.getAdminById(req.body);
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
  static deleteAdmin = async (req, res, next) => {
    const results = await adminModel.deleteAdmin(req.body);
    if (results) {
      const obj = {
        message: "Data deleted successfully",
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

  static loginAdmin = async (req, res, next) => {
    try {
      if (req.body.email && req.body.password) {
        let data = req.body;
        const email = data.email;
        const password = data.password;

        const [email_check] = await adminModel.checkEmailPass(email, password);

        if (email_check) {
          const obj = {
            message: "Successfully logged in ",
            results: email_check,
            status: true,
          };
          res.status(200).json(obj);
        } else {
          const obj = {
            message: "Username or password entered wrong!",
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

  static updateAdmin = async (req, res, next) => {
    try {
      if (
        req.body.email &&
        req.body.phone &&
        req.body.name &&
        req.body.type &&
        req.body.id
      ) {
        const phone = await adminModel.checkPhone(req.body);
        const email = await adminModel.checkEmail(req.body);
        if (email.length || phone.length) {
          const obj = {
            message:
              email.length && phone.length
                ? "Email and phone already exists"
                : email.length
                ? "Email already exists"
                : "Phone already exist",
            results: [],
            status: false,
          };
          res.status(200).json(obj);
        } else {
          const results = await adminModel.updateAdmin(req.body);
          const obj = {
            message: "Data fetch successfully",
            results: results,
            status: true,
          };
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
  static addAdmin = async (req, res, next) => {
    try {
      if (req.body.email && req.body.phone && req.body.name && req.body.type) {
        const phone = await adminModel.checkPhone(req.body);
        const email = await adminModel.checkEmail(req.body);
        if (email.length || phone.length) {
          const obj = {
            message:
              email.length && phone.length
                ? "Email and phone already exists"
                : email.length
                ? "Email already exists"
                : "Phone already exist",
            results: [],
            status: false,
          };
          res.status(200).json(obj);
        } else {
          const results = await adminModel.addAdmin(req.body);
          const obj = {
            message: "Data fetch successfully",
            results: results,
            status: true,
          };
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

  static checkEmail = async (req, res, next) => {
    try {
      if (req.body.email) {
        const results = await adminModel.checkEmail(req.body);
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
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };
  static checkPhone = async (req, res, next) => {
    try {
      if (req.body.phone) {
        const results = await adminModel.checkPhone(req.body);
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
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };

  static getAdminListPagination = async (req, res, next) => {
    const results = await adminModel.getAdminListPagination(req.body);
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
