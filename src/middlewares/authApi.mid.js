const API_KEY = process.env.APP_AUTH_API_KEY;

const authApi = (req, res, next) => {
  const key = req.headers;
  // return res.status(400).json({ api_message: "Teste de API KEY." });
  next();
}

module.exports = authApi;
