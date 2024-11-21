const { deleteImage } = require("../../deleteimage");
const ProductsModelQueries = require("../models/product.model");

const createNewProduct = async (req, res) => {
  const newProduct = req.body;

  // Parse dos tipos
  newProduct.price = parseFloat(newProduct.price);
  newProduct.stock = parseInt(newProduct.stock);
  newProduct.category_id = parseInt(newProduct.category_id);
  newProduct.product_status = parseInt(newProduct.stock) > 0 ? 1 : 0;
  newProduct.url_image = req.file ? req.file.filename : null;

  try {
    const totalProdutos = (await ProductsModelQueries.getTotalProducts())[0].total;

    if (totalProdutos >= MAX_API_PRODUCTS) {
      deleteImage(`uploads/${newProduct.url_image}`);

      return res.status(401).json({
        total_products: totalProdutos,
        api_message: "Máximo de produtos cadastrados!",
        allowed_max_products: MAX_API_PRODUCTS
      });

    } else {
      await ProductsModelQueries.createProduct(newProduct, newProduct.url_image);

      return res.status(201).json({
        api_message: "Produto cadastrado com sucesso!",
        total_products: totalProdutos,
        new: newProduct
      });
    }

  } catch (err) {
    res.status(500).json({
      api_message: err
    });
  }
}

const ctrl_updateProductByCode = async (req, res) => {
  const id = req.params.id;
  const updateProduct = req.body;
  const fotoAtual = (await ProductsModelQueries.getProductByCode(id))[0].url_image;

  // Parse dos tipos
  updateProduct.price = parseFloat(updateProduct.price);
  updateProduct.stock = parseInt(updateProduct.stock);
  updateProduct.category_id = parseInt(updateProduct.category_id);
  updateProduct.product_status = parseInt(updateProduct.stock) > 0 ? 1 : 0;
  updateProduct.url_image = req.file ? req.file.filename : fotoAtual;

  if (updateProduct.url_image != fotoAtual) {
    deleteImage( "uploads/" + fotoAtual );
  }
  
  try {
    const row = await ProductsModelQueries.updateProduct(updateProduct, id);
    const prod = await ProductsModelQueries.getProductByCode(id);

    if (row.affectedRows == 0) {
      return res.status(404).json({ api_message: "Produto não encontrado!" });
    }

    return res.status(200).json({
      api_message: "Produto atualizado com sucesso.",
      newInfos: {
        ...updateProduct,
        updateAt: prod[0].update_date
      }
    });

  } catch (err) {
    return res.status(500).json({ api_message: err });
  }
};

const ctrl_deleteProduct = async (req, res) => {
  const id = req.params.id;
  const imgDelete = req.body.deleteImg;

  try {
    const row = await ProductsModelQueries.deleteProduct(id);

    if (row.affectedRows == 0) {
      return res.status(404).json({ api_message_error: ["Produto não encontrado."] });
    }

    deleteImage(imgDelete);
    res.status(200).json({ api_message: "Produto deletado com sucesso." });

  } catch (err) {
    return res.status(500).json({ api_message_error: err });
  }
};

const ctrl_showProductByCode = async (req, res) => {
  const id = req.params.id;

  try {
    const row = await ProductsModelQueries.getProductByCode(id);

    if (row.length == 0) {
      return res.status(404).json({ api_message: "Produto não encontrado!" });
    }

    return res.status(200).json(row[0]);

  } catch (err) {
    return res.status(500).json({ api_message: err });
  }

};

const ctrl_showProducts = async (req, res) => {
  try {
    const totalProdutos = (await ProductsModelQueries.getTotalProducts())[0].total;
    const rows = await ProductsModelQueries.getProducts();

    if (rows.length == 0) {
      return res.status(204).json();
    }


    return res.status(200).json({
      total_products: totalProdutos,
      allowed_max_products: MAX_API_PRODUCTS,
      products: [
        ...rows
      ]
    });
  } catch (err) {
    return res.status(500).json({ api_message: err });
  }
};

const ctrl_truncateProducts = async (req, res) => {
  try {
    const imagens = (await ProductsModelQueries.getProducts());
    await ProductsModelQueries.deleteAllProds();
    
    imagens.forEach(img => {
      deleteImage(img.url_image);
    });

    return res.status(200).json({ api_message: "Todos os registros e imagens foram deletados" });
  } catch (err) {
    return res.status(500).json({ api_message: err });
  }
};

module.exports = {
  createNewProduct,
  ctrl_updateProductByCode,
  ctrl_deleteProduct,
  ctrl_showProductByCode,
  ctrl_showProducts,
  ctrl_truncateProducts,
}
