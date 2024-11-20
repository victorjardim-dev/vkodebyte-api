const fs = require('fs');

const deleteImage = (imagem) => {
  fs.unlink(imagem, err => {
    if (err) {
      // console.log(err);
      console.error("Erro ao deletar a imagem");
      return;
    }
    console.log("Imagem deletada com sucesso.");
  });
}

module.exports = {
  deleteImage,
}
