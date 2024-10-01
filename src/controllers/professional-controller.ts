import { Request, Response } from "express";
import { ProfessionalsService } from "../services/professionals-service";

export class ProfessionalsController {
  private professionalsService: ProfessionalsService;

  constructor() {
    this.professionalsService = new ProfessionalsService();
  }

  async getAllProfessionals(req: Request, res: Response): Promise<void> {
    try {
      const professionals =
        await this.professionalsService.getAllProfessionals();
      res.json(professionals);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar profissionais" });
    }
  }

  async createProfessional(req: Request, res: Response): Promise<void> {
    try {
      const professional = await this.professionalsService.createProfessional(
        req.body
      );
      res.json(professional);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar profissional" });
    }
  }

  async deleteProfessional(req: Request, res: Response): Promise<void> {
    try {
      await this.professionalsService.deleteProfessional(
        parseInt(req.params.id)
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar profissional" });
    }
  }
}
