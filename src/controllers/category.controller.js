const categoriesModelQueries = require("../models/categories.model");

// Lista todas as categorias
const getAllCategories = async (req, res) => {
  const rows = await categoriesModelQueries.listCategories();

  if (rows.length == 0) {
    return res.status(204).json();
  } 

  return res.status(200).json(rows);
}

module.exports = {
  getAllCategories,
}
