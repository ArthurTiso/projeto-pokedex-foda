
const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const pokemonRouter = require("./pokemonRouter");



// rota de teste
router.get("/", (req, res) => {
  res.send("teste 123");
});

router.use("/auth", authRouter); //Rota de autenticação
router.use("/pokemons", pokemonRouter);//Rota para a coleção de pokémon

module.exports = router;
 