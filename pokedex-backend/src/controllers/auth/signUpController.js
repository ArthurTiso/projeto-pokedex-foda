const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function signUpController(req, res, next) { //Função para o login do usuário, além do encript via bcrypt
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { 
        name,  
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Usuário criado com sucesso!", userId: user.id });//Mensagem de confirmação do sing up
  } catch (error) {
    next(error);
  }
}

module.exports = { signUpController };
