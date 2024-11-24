const db_exec = require("../connection");

// Adiciona um novo produto
const listCategories = () => {
  const query = "SELECT * FROM categories;";
  return db_exec(query, "Não foi possível listar as categorias.");
}

// Adiciona um novo produto
const createCategory = (category) => {
  const query = "INSERT INTO categories SET ?;";
  return db_exec(query, category, "Não foi possível criar a categoria.");
}

// Adiciona um novo produto
const deleteCategory = (id) => {
  const query = "DELETE FROM categories WHERE id = ?;";
  return db_exec(query, id, "Não foi possível deletar a categoria.");
}

// Retorna a quantidade total de products cadastrados
const getTotalCategories = () => {
  const query = "SELECT COUNT(*) as total FROM categories;";
  return db_exec(query, "Não foi possível executar a consulta.")
}

module.exports = {
  listCategories,
  createCategory,
  getTotalCategories,
  deleteCategory,
}
