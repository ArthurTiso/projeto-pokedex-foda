const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Cria um novo time com os Pokémon relacionados
const createTeam = async (req, res) => {
  const { name, userId, pokemonIds = [] } = req.body;

  try {
    const team = await prisma.team.create({
      data: {
        name,
        userId,
        pokemons: {
          connect: pokemonIds.map((id) => ({ id })),
        },
      },
      include: { pokemons: true },
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar time", details: error });
  }
};

// Retorna todos os times com usuários e pokémons relacionados
const getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        user: true,
        pokemons: true,
      },
    });

    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar times", details: error });
  }
};

// Busca um time específico pelo ID
const getTeamById = async (req, res) => {
  const { id } = req.params;

  try {
    const team = await prisma.team.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        pokemons: true,
      },
    });

    if (!team) {
      return res.status(404).json({ error: "Time não encontrado" });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar time", details: error });
  }
};

// Atualiza um time existente
const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, pokemonIds = [] } = req.body;

  try {
    const updated = await prisma.team.update({
      where: { id: Number(id) },
      data: {
        name,
        pokemons: {
          set: pokemonIds.map((pokeId) => ({ id: pokeId })),
        },
      },
      include: { pokemons: true },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar time", details: error });
  }
};

// Deleta um time
const deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.team.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Time deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar time", details: error });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
