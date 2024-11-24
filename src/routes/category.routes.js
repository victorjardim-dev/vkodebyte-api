const express = require("express");
const categoryController = require("../controllers/category.controller");
const routes = express.Router();

routes.get("/", categoryController.getAllCategories);
routes.post("/", categoryController.newCategory);
routes.delete("/:id", categoryController.deleteCategory);

module.exports = routes;
