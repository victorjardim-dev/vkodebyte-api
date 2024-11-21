const express = require("express");
const routes = express.Router();
const productController = require("../controllers/product.controller");
const middleProducts = require("../middlewares/product.mid");
const uploadImage = require("../../createimage");

// Retorna todos os produtos cadastrados
routes.get("/", productController.ctrl_showProducts);

// Retorna o produto pelo seu código
routes.get("/:id", productController.ctrl_showProductByCode);

// Adiciona um novo produto
routes.post("/", uploadImage.single("url_image"), middleProducts.checkFields, productController.createNewProduct);

// Atualiza um produto pelo seu código
routes.put("/:id", uploadImage.single("url_image"), middleProducts.checkFields, productController.ctrl_updateProductByCode);

// Deleta um produto pelo seu código
routes.delete("/:id", productController.ctrl_deleteProduct);

module.exports = routes;
