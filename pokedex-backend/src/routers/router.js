
const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const pokemonRouter = require("./pokemonRouter");
const teamRouter = require("./teamRouter");
const regionRouter = require("./regionRouter");
const regionController = require("../controllers/regionController");

// rota de teste
router.get("/", (req, res) => {
  res.send("teste 123");
});

router.use("/auth", authRouter); //Rota de autenticação
router.use("/pokemons", pokemonRouter);//Rota para a coleção de pokémon
router.use("/teams", teamRouter);//Rota para os times
router.use("/regions", regionRouter);//Rota regiões
module.exports = router;
 