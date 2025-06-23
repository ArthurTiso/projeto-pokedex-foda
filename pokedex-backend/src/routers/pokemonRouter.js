const express = require("express");
const router = express.Router();

const {
  createPokemon,
  getAllPokemons,
  getPokemonById,
  updatePokemon,
  deletePokemon
} = require("../controllers/pokemonController");

const { pokemonSchema } = require("../validations/pokemonValidation");
const { zodValidation } = require("../middlewares/zodValidation");

// Rotas
router.post("/", zodValidation(pokemonSchema), createPokemon);
router.get("/", getAllPokemons);
router.get("/:id", getPokemonById);
router.put("/:id", zodValidation(pokemonSchema), updatePokemon);
router.delete("/:id", deletePokemon);

module.exports = router;
