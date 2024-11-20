const db_exec = require("../connection");

// Adiciona um novo produto
const listCategories = (product) => {
  const query = "SELECT * FROM categories;";
  return db_exec(query, product, "Não foi possível listar as categorias.");
}

module.exports = {
  listCategories,
}
