MAX_API_PRODUCTS = 50;

require("dotenv").config();
const app = require("./src/app");

const HOST = process.env.APP_HOST;
const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`Server rodando em: http://${HOST}:${PORT}/`);
  console.log("Use CRTL+C para parar a aplicação.")
});
