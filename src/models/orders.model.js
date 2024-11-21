const db_exec = require("../connection");

const getOrders = () => {
  const query = "SELECT * FROM orders";
  return db_exec(query, "Não foi possível excutar a query");
}

module.exports = {
  getOrders,
}
