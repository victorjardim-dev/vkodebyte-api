const express = require("express");
const routes = express.Router();
const ordersController = require("../controllers/orders.controller");

routes.get("/", ordersController.getAllOrders);

module.exports = routes;
