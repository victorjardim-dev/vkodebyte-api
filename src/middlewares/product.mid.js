const { deleteImage } = require("../../deleteimage");

const min_caracteres_length = 5;
const max_caracteres_length = 500;

const isInvalidFields = (fields) => (!fields.name || !fields.price || !fields.category_id);
const isNegativeField = (fields) => (fields.price < 0 || fields.stock < 0);

const checkCaracters = (fields) => {
  const erros = [];

  if (fields.name.length < min_caracteres_length) {
    erros.push(`O nome do produto precisa de no mínimo ${min_caracteres_length} caracteres`);
  }

  if (fields.description.length > max_caracteres_length) {
    erros.push(`A descrição do produto pode conter no máximo ${max_caracteres_length} caracteres`);
  }

  if (erros.length > 0) {
    return {
      erros_msg: [
        ...erros
      ],
      status: 1
    }
  } else {
    return {
      status: 0
    }
  }
}

const checkFields = (req, res, next) => {
  const product = req.body;
  const reqImg = req.file ? req.file.path : "";

  // Verificação se existem todos os campos
  if ( isInvalidFields(product) ) {
    deleteImage(reqImg);
    return res.status(400).json({
      api_message_error: "Por favor, preencha os campos!"
    });
  }

  // Verifica o número mínimo de caracteres permitido
  const checkCaracterMsg = checkCaracters(product);

  if (checkCaracterMsg.status) {
    deleteImage(reqImg);
    return res.status(400).json({
      api_message_error: { errors: checkCaracterMsg.erros_msg }
    });
  }

  // Verifcação do campo de preço
  if (isNaN(+product.price)) {
    deleteImage(reqImg);
    return res.status(400).json({
      api_message_error: "Preço incorreto!"
    });
  }

  if (isNegativeField(product)) {
    deleteImage(reqImg);
    return res.status(400).json({
      api_message_error: "Preço ou estoque não podem ser negativos!"
    });
  }
  
  if (reqImg === "") {
    return res.status(400).json({
      api_message_error: "Imagem do produto obrigatória."
    });
  }

  next();
}

module.exports = {
  checkFields
}
