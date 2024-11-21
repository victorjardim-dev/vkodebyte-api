const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura upload de imagem
app.use('/uploads', express.static(path.join(__dirname, "..", 'uploads')));

// Rotas de produtos
const productsRoutes = require("./routes/product.routes");
app.use("/produtos", productsRoutes);

//Rotas de pedidos
const ordersRoutes = require("./routes/order.routes");
app.use("/pedidos", ordersRoutes);

//Rotas de categorias
const categoriesRoutes = require("./routes/category.routes");
app.use("/categorias", categoriesRoutes);

// ROTA PARA ZERAR TABELA - APENAS EM DESENVOLVIMENTO
const zerarRoute = require("./routes/zerar.routes");
app.use("/zerar-tabela-produtos", zerarRoute);

module.exports = app;
