const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Funçaõ para criar pokémon
async function createPokemon(req, res, next) {
  try {
    const pokemon = await prisma.pokemon.create({ data: req.body });
    res.status(201).json({ message: "Pokémon criado com sucesso!", pokemon });
  } catch (error) {
    next(error);
  }
}

// Função para listar todos os pokémons
async function getAllPokemons(req, res, next) {
  try {
    const pokemons = await prisma.pokemon.findMany();
    res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
}

// Função para buscar pokémon por ID
async function getPokemonById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const pokemon = await prisma.pokemon.findUnique({ where: { id } });

    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon não encontrado." });
    }

    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
}

// Função para atualizar info pokémon
async function updatePokemon(req, res, next) {
  try {
    const id = Number(req.params.id);
    const pokemon = await prisma.pokemon.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json({ message: "Pokémon atualizado com sucesso!", pokemon });
  } catch (error) {
    next(error);
  }
}

// Função para deletar pokémon
async function deletePokemon(req, res, next) {
  try {
    const id = Number(req.params.id);
    await prisma.pokemon.delete({ where: { id } });
    res.status(200).json({ message: "Pokémon deletado com sucesso!" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPokemon,
  getAllPokemons,
  getPokemonById,
  updatePokemon,
  deletePokemon,
};
