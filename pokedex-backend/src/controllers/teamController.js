const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar time
async function createTeam(req, res, next) {
  try {
    const { name, userId, pokemonIds = [] } = req.body;

    const team = await prisma.team.create({
      data: {
        name,
        user: { connect: { id: userId } },
        pokemons: {
          connect: pokemonIds.map(id => ({ id }))
        }
      },
      include: { pokemons: true }
    });

    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
}

// Listar times
async function getAllTeams(req, res, next) {
  try {
    const teams = await prisma.team.findMany({ include: { pokemons: true } });
    res.json(teams);
  } catch (error) {
    next(error);
  }
}

// Atualizar time
async function updateTeam(req, res, next) {
  try {
    const { id } = req.params;
    const { name, pokemonIds } = req.body;

    const updated = await prisma.team.update({
      where: { id: Number(id) },
      data: {
        name,
        pokemons: pokemonIds ? {
          set: pokemonIds.map(id => ({ id }))
        } : undefined
      },
      include: { pokemons: true }
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
}

// Deletar time
async function deleteTeam(req, res, next) {
  try {
    const { id } = req.params;

    await prisma.team.delete({ where: { id: Number(id) } });

    res.json({ message: 'Time deletado com sucesso.' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTeam,
  getAllTeams,
  updateTeam,
  deleteTeam
};
