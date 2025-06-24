const { z } = require("zod");

// Validação para criar time
const createTeamSchema = z.object({
  name: z.string().min(1, "O nome do time é obrigatório"),
  userId: z.number().int().positive("O userId deve ser um número inteiro positivo"),
  pokemonIds: z
    .array(z.number().int().positive())
    .nonempty("Deve haver pelo menos um Pokémon no time"),
});

// Validação para atualizar time
const updateTeamSchema = z.object({
  name: z.string().min(1, "O nome do time é obrigatório"),
  pokemonIds: z
    .array(z.number().int().positive())
    .nonempty("Deve haver pelo menos um Pokémon no time"),
});

module.exports = { createTeamSchema, updateTeamSchema };
