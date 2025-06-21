//Tratamento de erros
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno no servidor!" });
}

module.exports = { errorHandler };
