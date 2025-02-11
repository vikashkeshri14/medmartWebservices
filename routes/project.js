const express = require("express");
const projectControllers = require("../controllers/project");
const Router = express.Router();
Router.get("/getProjects", projectControllers.getProjects);
Router.post("/getProjectById", projectControllers.getProjectById);
Router.post("/getProjectByCode", projectControllers.getProjectByCode);
Router.post(
  "/getProjectImagesByCode",
  projectControllers.getProjectImagesByCode
);
Router.post("/projectDelete", projectControllers.projectDelete);
Router.post("/addProject", projectControllers.addProject);
Router.post("/updateProject", projectControllers.updateProject);
Router.post(
  "/getProjectsByPagination",
  projectControllers.getProjectsByPagination
);
Router.post(
  "/getCategoriesByPagination",
  projectControllers.getCategoriesByPagination
);
Router.get("/getAllCategory", projectControllers.getAllCategory);
Router.post("/getCategoryById", projectControllers.getCategoryById);
Router.post("/addCategory", projectControllers.addCategory);
Router.post("/updateCategory", projectControllers.updateCategory);

Router.post("/getPostByPagination", projectControllers.getPostByPagination);
Router.post("/getPostById", projectControllers.getPostById);
Router.post("/addPost", projectControllers.addPost);
Router.post("/updatePost", projectControllers.updatePost);
Router.get("/area", projectControllers.area);
Router.get("/city", projectControllers.city);
Router.get("/district", projectControllers.district);
Router.post("/addVillas", projectControllers.addVillas);

module.exports = Router;
