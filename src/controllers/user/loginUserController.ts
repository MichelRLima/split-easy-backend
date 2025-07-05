import { Request, Response } from "express";
import { UserRequest } from "../../middlewares/auth/UserRequest";
const loginUser = require("../../models/user/loginUser");

module.exports = {
  async handle(req: Request, res: Response) {
    const { email, senha }: UserRequest = req.body;
    try {
      console.log("chamando");

      const response = await loginUser.execute(email, senha);
      console.log("usuario logado");
      return res.status(201).json(response);
    } catch (error: any) {
      const statusCode = error.status || 500;
      const message = error.message || "Erro interno no servidor.";
      return res.status(statusCode).json({ error: message });
    } finally {
    }
  },
};
