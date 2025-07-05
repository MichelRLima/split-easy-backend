import { Request, Response } from "express";
import { UserRequest } from "../../middlewares/auth/UserRequest";
const { createUser } = require("../../models/user/createUser");

module.exports = {
  async handle(req: Request, res: Response) {
    const { nome, email, senha }: UserRequest = req.body;
    try {
      const response = await createUser.execute(nome, email, senha);
      console.log("usuário criado");
      return res.status(201).json(response);
    } catch (error: any) {
      const statusCode = error.status || 500;
      const message = error.message || "Erro interno no servidor.";
      return res.status(statusCode).json({ error: message });
    } finally {
    }
  },
};
