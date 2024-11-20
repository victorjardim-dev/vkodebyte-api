const express = require("express");
const { getAllCategories } = require("../controllers/category.controller");
const routes = express.Router();

routes.get("/", getAllCategories);

module.exports = routes;
