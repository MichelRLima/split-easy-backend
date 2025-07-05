import { Router, Request, Response } from "express";

const createUserController = require("./controllers/user/createUserController");
const loginUserController = require("./controllers/user/loginUserController");
import { isAuthenticated } from "./middlewares/isAuthenticated";
const routes = Router();

// Rota simples de teste
routes.get("/ping", isAuthenticated, (req: Request, res: Response) => {
  res.json({ message: "pong 🏓" });
});

routes.post("/createUser", createUserController.handle);
routes.post("/login", loginUserController.handle);

export default routes;
