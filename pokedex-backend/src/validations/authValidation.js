const { z } = require("zod");


const signUpSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1,"Email inválido"),
  password: z.string().min(4, "Senha deve ter pelo menos 4 caracteres"),
});

module.exports = { signUpSchema };


const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1), 
});

module.exports = { signUpSchema, loginSchema };
