const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routers/router"); // ✅ Caminho para o seu arquivo local
const { logger } = require("./middlewares/logger");
const { errorHandler } = require("./middlewares/errorHandler");


app.use(cors())//Uso do cors para linkar back e front 

app.use(logger); // middleware de login

app.use(express.json()); //Leitura de Json

// rotas
app.use("/", router);

// tratador de erros
app.use(errorHandler);

// start do servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
