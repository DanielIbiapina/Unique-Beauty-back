import { Request, Response } from "express";
import { ServicesService } from "../services/services-service";

export class ServicesController {
  private servicesService: ServicesService;

  constructor() {
    this.servicesService = new ServicesService();
  }

  async getAllServices(req: Request, res: Response): Promise<void> {
    try {
      const services = await this.servicesService.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar serviços" });
    }
  }

  async getServiceById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      const service = await this.servicesService.getServiceById(id);
      if (service) {
        res.json(service);
      } else {
        res.status(404).json({ error: "Serviço não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar serviço" });
    }
  }

  async getServicesGroupedByCategory(req: Request, res: Response) {
    try {
      const groupedServices: Record<
        string,
        Array<{ id: number; name: string; price: number }>
      > = await this.servicesService.getServicesGroupedByCategory();
      res.json(groupedServices);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao obter serviços agrupados por categoria" });
    }
  }

  // Adicione outros métodos conforme necessário (create, update, delete)
}
