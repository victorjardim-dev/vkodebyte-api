const express = require("express");
const routes = express.Router();
const adminController = require("../controllers/admin.controller");
const authToken = require("../middlewares/authtoken.mid");

routes.post("/novo-usuario", authToken, adminController.newUserLogin);
routes.post("/login", adminController.authLogin);
routes.get("/painel", authToken, adminController.dashboadLogin);
routes.get("/usuarios", authToken, adminController.listUsers);

module.exports = routes;
