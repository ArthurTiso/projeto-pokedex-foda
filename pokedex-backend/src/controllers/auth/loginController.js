    const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function loginController(req, res, next) { //Função para o login
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ 
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." }); //Mensagem de erro caso não haja tal usuário
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta." }); //Mensagem para caso senha eseja incorreta
    }

    res.status(200).json({ message: "Login bem-sucedido!", userId: user.id }); //Mensagem para login que funcionou
  } catch (error) {
    next(error);
  }
}

module.exports = { loginController };
