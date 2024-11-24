const db_exec = require("../connection");

// Busca por um usuario específico
const createUser = (user) => {
  const query = "INSERT INTO users SET ?;";
  return db_exec(query, user, "Não foi possível cadastra o usuário.");
}

// Busca por um usuario específico
const getUser = (username) => {
  const query = "SELECT * FROM users where username = ?;";
  return db_exec(query, username, "Não foi possível encontrar o usuário.");
}

module.exports = {
  createUser,
  getUser,
}
