import { Request, Response } from "express";
import { ClientService } from "../services/client-service";

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const client = await this.clientService.create(req.body);
      console.log(client);
      res.json(client);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar cliente" });
    }
  }

  async findByPhone(req: Request, res: Response): Promise<void> {
    try {
      const client = await this.clientService.findByPhone(req.params.phone);
      console.log(`ClientController: Cliente encontrado:`, client);
      res.json(client);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar cliente" });
    }
  }

  async findAll(_req: Request, res: Response): Promise<void> {
    try {
      const clients = await this.clientService.findAll();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar clientes" });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.clientService.delete(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar cliente" });
    }
  }
}
