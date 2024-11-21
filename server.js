MAX_API_PRODUCTS = 100;

const https = require("https");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const app = require("./src/app");

const HOST = process.env.APP_HOST;
const PORT = process.env.APP_PORT;
const PORT_SSL = process.env.APP_PORT_SSL; // Porta SSL caso não esteja usando XAMPP

// Lendo arquivos do certificado copiados do XAMPP
const keyPath = path.join(__dirname, "server.key");
const certPath = path.join(__dirname, "server.crt");
const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

// Server HTTP para Desenvolvimento
app.listen(PORT, () => {
  console.log(`Server rodando em: http://${HOST}:${PORT}/`);
  console.log("Use CRTL+C para parar a aplicação.")
});

// Server HTTP para produção
// https.createServer(options, app).listen(PORT, () => {
//   console.log(`Servidor HTTPS rodando em https://${HOST}:${PORT}`);
// });
