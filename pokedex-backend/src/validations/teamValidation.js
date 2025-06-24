const { z } = require("zod");

const createTeamSchema = z.object({
  name: z.string().min(1),
  userId: z.number().int(),
  pokemonIds: z.array(z.number().int()).optional()
});

const updateTeamSchema = z.object({
  name: z.string().min(1).optional(),
  pokemonIds: z.array(z.number().int()).optional()
});

module.exports = { createTeamSchema, updateTeamSchema };
