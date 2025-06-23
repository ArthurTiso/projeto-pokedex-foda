const { z } = require("zod");

const pokemonSchema = z.object({
  name: z.string().min(2),
  number: z.number().int().positive(),
  type: z.string().min(3),
  height: z.number().positive(),
  weight: z.number().positive(),
  hp: z.number().int().nonnegative(),
  attack: z.number().int().nonnegative(),
  defense: z.number().int().nonnegative(),
  // regionId é opcional (por enquanto)
  regionId: z.number().int().positive().optional(),
});

module.exports = { pokemonSchema };
