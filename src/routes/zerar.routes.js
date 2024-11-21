const express = require("express");
const routes = express.Router();
const productController = require("../controllers/product.controller");

// Retorna todos os produtos cadastrados
routes.delete("/", productController.ctrl_truncateProducts);

module.exports = routes;
