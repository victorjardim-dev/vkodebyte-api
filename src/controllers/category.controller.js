const categoriesModelQueries = require("../models/categories.model");

// Lista todas as categorias
const getAllCategories = async (req, res) => {
  const rows = await categoriesModelQueries.listCategories();

  if (rows.length == 0) {
    return res.status(204).json();
  } 

  return res.status(200).json(rows);
}

// Cria uma nova categoria
const newCategory = async (req, res) => {
  const newCategory = req.body;
  try {

    if (newCategory.category_name == "") {
      return res.status(400).json({ api_message_error: "Insira o nome da categoria." });
    }

    await categoriesModelQueries.createCategory(newCategory);

    const totalCategories = (await categoriesModelQueries.getTotalCategories())[0].total;
  
    return res.status(201).json({
      api_message: "Categoria cadastrada com sucesso!",
      total_categories: totalCategories,
      new: newCategory
    });

  } catch (err) {
    return res.status(500).json({
      api_message_error: err
    });
  }

}

const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const row = await categoriesModelQueries.deleteCategory(id);

    if (row.affectedRows == 0) {
      return res.status(404).json({ api_message_error: ["Categoria não encontrada."] });
    }
    
    res.status(200).json({ api_message: "Categoria deletada com sucesso." });

  } catch (err) {
    return res.status(500).json({ api_message_error: err });
  }
}

module.exports = {
  getAllCategories,
  newCategory,
  deleteCategory,
}
