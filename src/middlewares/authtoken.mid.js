const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY_JWT;

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) return res.status(401).json({ api_message_error: "Acesso negado."});
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ api_message_error: "Token inválido."});
    req.user = user;
    next();
  });
}

module.exports = authToken;
