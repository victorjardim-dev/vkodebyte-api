const bcripty = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY_JWT;
const UsersModelQueries = require("../models/users.model");

const authLogin = async (req, res) => {
  const {username, user_pass} = req.body;

  try {
    const acessUser = (await UsersModelQueries.getUser(username));

    if (acessUser.length > 0) {
      const usr = acessUser[0];

      bcripty.compare(user_pass, usr.user_pass, (err, isMath) => {
        if (err) throw err;
  
        if (isMath) {
          const token = jwt.sign( {id: usr.id, user: usr.username}, SECRET_KEY, { expiresIn: "5m" } );
          return res.status(200).json({ api_message: "Login bem-sucedido!", token: token,  });
        } else {
          console.log("Diferente");
          return res.status(401).json({ api_message_error: "Senha incorreta!" });
        }
      });

    } else {
      return res.status(404).json({ api_message_error: "Usuário não encontrado." });
    }

  } catch(err) {
    return res.status(500).json({ api_message_error: err });
  }
}

const dashboadLogin = async (req, res) => {
  return res.json({ api_message: `Bem-vindo, ${req.user.user}!` });
}

const newUserLogin = async (req, res) => {
  const newUser = req.body;
  
  if (!newUser.username || !newUser.user_pass || !newUser.email) return res.status(400).json( { api_message_error: "Campos não pode estar vazios" } );

  try {
    const hashedPass = await bcripty.hash(newUser.user_pass, 10);
    newUser.user_pass = hashedPass;
  
    await UsersModelQueries.createUser(newUser);
  
    res.status(201).json({
      api_message: "Usuário criado com sucess!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ api_message_error: "Erro no servidor" });
  }
}

module.exports = {
  authLogin,
  dashboadLogin,
  newUserLogin,
};
