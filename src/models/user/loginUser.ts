import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

module.exports = {
  async execute(email: string, senha: string) {
    try {
      const user = await prisma.usuario.findFirst({ where: { email } });

      if (!user) {
        throw Object.assign(new Error("Usuário não encontrado"), {
          status: 404,
        });
      }

      const isPasswordCorrect = await bcrypt.compare(senha, user.senha);
      if (!isPasswordCorrect) {
        throw new Error("Senha incorreta");
      }
      const token = sign(
        //sempre que o usuario for logado, necessario criar um token, sendo necessario passar os dados de acesso e a chave secreta
        {
          name: user?.nome,
          email: user?.email,
        },
        process.env.JWT_SECRET as string, //afirmando que é uma strig
        {
          subject: user?.id,
          expiresIn: "30d",
        }
      );

      return {
        id: user?.id,
        name: user?.nome,
        email: user?.email,
        token: token,
      };
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
    }
  },
};
