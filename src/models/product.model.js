const db_exec = require("../connection");

// Adiciona um novo produto
const createProduct = (product, img) => {
  const query = "INSERT INTO products SET ?;";
  return db_exec(query, product, "Não foi possível cadastrar o produto.", img);
}

// Atualiza um produto pelo seu código
const updateProduct = (updates, code_id) => {
  const query = "UPDATE products SET ? WHERE product_code = ?";
  return db_exec(query, [updates, code_id], "Não foi possível atualizar o produto.");
}

// Atualiza um produto pelo seu código
const deleteProduct = (code_id) => {
  const query = "DELETE FROM products WHERE product_code = ?";
  return db_exec(query, code_id, "Não foi possível deletar o produto.");
}

// Busca por um produto específico pelo código
const getProductByCode = (code_id) => {
  const query = "SELECT * FROM products where product_code = ?;";
  return db_exec(query, code_id, "Não foi possível encontrar o produto.");
}

// Mostra todos os products
const getProducts = () => {
  const query = "SELECT * FROM products;";
  return db_exec(query, "Não foi possível executar a consulta.");
}

// Retorna a quantidade total de products cadastrados
const getTotalProducts = () => {
  const query = "SELECT COUNT(*) as total FROM products;";
  return db_exec(query, "Não foi possível executar a consulta.")
}

// Inicia a aplicação com alguns produtos já cadastrados
const initProducts = async () => {  
  for(let i = 1; i <= 10; i++) {
    if ((await getTotalProducts())[0].total >= MAX_API_PRODUCTS) {
      break;
    }
    
    const product = {
      name: `Teste ${i}`,
      description: `Teste ${i} para um novo produto`,
      // Math.floor(Math.random() * (max - min + 1)) + min
      price: Math.floor(Math.random() * (500 - 1 + 1)) + 0,
      stock: Math.floor(Math.random() * (50 - 1 + 1)) + 0,
      product_status: Math.floor(Math.random() * (2 - 1 + 0)) + 1,
      category_id: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
      url_image: null
    }
    await createProduct(product);
  }
}

// (async() => {
//   if (( await getTotalProducts())[0].total == 0) {
//     initProducts();
//   }
// })();

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCode,
  getProducts,
  getTotalProducts,
}
