import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const createUser = {
  async execute(nome: string, email: string, password: string) {
    try {
      const isExist = await prisma.usuario.findFirst({ where: { email } });

      if (isExist) {
        throw Object.assign(new Error("User already exists!"), {
          status: 409,
        });
      }
      // Criptografar senha
      const hashedPassword = await bcrypt.hash(password, 10); // 10 é o "salt rounds"

      const user = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: hashedPassword,
        },
      });

      return user;
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  },
};
