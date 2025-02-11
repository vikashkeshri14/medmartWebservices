const projectModel = require("../models/projectModel");
module.exports = class projectControllers {
  static projectDelete = async (req, res, next) => {
    const results = await projectModel.projectDelete(req.body);
    if (results) {
      const obj = {
        message: "Data deleted successfully",
        results: results,
        status: true,
      };
      res.status(200).json(obj);
    } else {
      const obj = {
        message: "Try again",
        results: 1,
        status: false,
      };
      res.status(200).json(obj);
    }
  };
  static getProjectsByPagination = async (req, res, next) => {
    const results = await projectModel.getProjectsByPagination(req.body);
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
  static getProjectByCode = async (req, res, next) => {
    const results = await projectModel.getProjectByCode(req.body);
    const images = await projectModel.getProjectImageByCode(req.body);
    if (results.length) {
      const obj = {
        message: "Data fetch successfully",
        results: results,
        images: images,
        status: true,
      };
      res.status(200).json(obj);
    } else {
      const obj = {
        message: "No data",
        results: [],
        images: [],
        status: false,
      };
      res.status(200).json(obj);
    }
  };
  static getProjectImagesByCode = async (req, res, next) => {
    const images = await projectModel.getProjectImageByCode(req.body);
    if (images.length) {
      const obj = {
        message: "Data fetch successfully",
        images: images,
        status: true,
      };
      res.status(200).json(obj);
    } else {
      const obj = {
        message: "No data",
        results: [],
        images: [],
        status: false,
      };
      res.status(200).json(obj);
    }
  };
  static getProjectById = async (req, res, next) => {
    const results = await projectModel.getProjectById(req.body);

    if (results.length) {
      const images = await projectModel.getProjectImageByCode(results[0]);
      const obj = {
        message: "Data fetch successfully",
        results: results,
        images: images,
        status: true,
      };
      res.status(200).json(obj);
    } else {
      const obj = {
        message: "No data",
        results: [],
        images: [],
        status: false,
      };
      res.status(200).json(obj);
    }
  };
  static getProjects = async (req, res, next) => {
    const results = await projectModel.getProjects();

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
  static addProject = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (
        req.body.projectname &&
        req.body.projectdescription &&
        req.body.projectlocation &&
        req.body.projectcode &&
        req.body.images.length &&
        req.body.googleLocation &&
        req.body.unit &&
        req.body.building &&
        req.body.profile.length &&
        req.body.projectMainImages.length
      ) {
        const results = await projectModel.insertProject(req.body);

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

  static updateProject = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (
        req.body.projectname &&
        req.body.projectdescription &&
        req.body.projectlocation &&
        req.body.projectcode &&
        req.body.googleLocation &&
        req.body.unit &&
        req.body.building &&
        req.body.id
      ) {
        const results = await projectModel.updateProject(req.body);

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
  static getCategoriesByPagination = async (req, res, next) => {
    const results = await projectModel.getCategoriesByPagination(req.body);
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

  static getCategoryById = async (req, res, next) => {
    const results = await projectModel.getCategoryById(req.body);

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
  static getAllCategory = async (req, res, next) => {
    const results = await projectModel.getAllCategory(req.body);

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
  static addCategory = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.name && req.body.namear && req.body.images.length) {
        const results = await projectModel.addCategory(req.body);

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
  static updateCategory = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.name && req.body.namear && req.body.images.length) {
        const results = await projectModel.updateCategory(req.body);

        if (results) {
          const obj = {
            message: "Successfully updated ",
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

  static addPost = async (req, res, next) => {
    try {
      if (req.body.title) {
        const results = await projectModel.addPost(req.body);

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
  static updatePost = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.title) {
        const results = await projectModel.updatePost(req.body);

        if (results) {
          const obj = {
            message: "Successfully updated ",
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

  static getPostByPagination = async (req, res, next) => {
    const results = await projectModel.getPostByPagination(req.body);
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

  static getPostById = async (req, res, next) => {
    const results = await projectModel.getPostById(req.body);

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

  static area = async (req, res, next) => {
    const results = await projectModel.area(req.body);

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

  static city = async (req, res, next) => {
    const results = await projectModel.city(req.body);

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

  static district = async (req, res, next) => {
    const results = await projectModel.district(req.body);

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

  static addVillas = async (req, res, next) => {
    const results = await projectModel.addVillas(req.body);

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
