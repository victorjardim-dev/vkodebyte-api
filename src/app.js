const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

const allowedDomains = ['https://victorjardim.dev', 'https://victorjardim.online'];
const corsOptions = (req, callback) => {
  const origin = req.header('Origin'); // Obtém o domínio da requisição
  if (allowedDomains.includes(origin)) {
    callback(null, { origin: true }); // Autoriza o domínio
  } else {
    callback(null, { origin: false }); // Bloqueia o domínio
  }
};

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
