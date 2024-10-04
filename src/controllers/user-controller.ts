import { Request, Response } from "express";
import { UserService } from "../services/user-service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response) {
    try {
      const { username, password, role } = req.body;
      console.log(username, password, role);
      const newUser = await this.userService.createUser({
        username,
        password,
        role,
      });
      res
        .status(201)
        .json({ message: "Usuário criado com sucesso", userId: newUser.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }
}
