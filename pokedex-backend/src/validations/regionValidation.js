const { z } = require("zod");

const regionSchema = z.object({
  name: z.string().min(1, "Nome da região é obrigatório"),
  pokemonIds: z.array(z.number()).optional(),
});

module.exports = { regionSchema };
