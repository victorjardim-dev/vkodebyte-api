const mysql = require("mysql2");
const { deleteImage } = require("../deleteimage");

const conn = mysql.createConnection({
  host: process.env.db_HOST,
  user: process.env.db_USER,
  password: process.env.db_PASS,
  database: process.env.db_NAME,
  port: process.env.db_PORT,
});

conn.connect();

const db_exec = (sql, values = "", rejectMessage, imagem = "") => {
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (err, result) => {
      if (err) {
        deleteImage(imagem);
        return reject([ rejectMessage, err.sqlMessage ]);
      }
      const rows = JSON.parse(JSON.stringify(result));
      return resolve(rows);
    });
  });
}

module.exports = db_exec;
