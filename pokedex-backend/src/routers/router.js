
const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const pokemonRouter = require("./pokemonRouter");
const teamRouter = require("./teamRouter");


// rota de teste
router.get("/", (req, res) => {
  res.send("teste 123");
});

router.use("/auth", authRouter); //Rota de autenticação
router.use("/pokemons", pokemonRouter);//Rota para a coleção de pokémon
router.use("/teams", teamRouter);//Rota para os times

module.exports = router;
 