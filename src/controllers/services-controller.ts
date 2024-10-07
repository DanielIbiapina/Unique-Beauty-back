import { Request, Response } from "express";
import { ServicesService } from "../services/services-service";

export class ServicesController {
  private servicesService: ServicesService;

  constructor() {
    this.servicesService = new ServicesService();
  }

  async getAllServices(_req: Request, res: Response): Promise<void> {
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

  async getServicesGroupedByCategory(_req: Request, res: Response) {
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

  async getMostPopularServices(req: Request, res: Response) {
    const { year, month } = req.params;
    const yearNum = parseInt(year);
    const monthNum = parseInt(month) - 1; // JavaScript usa meses de 0 a 11

    // Calcula o primeiro dia do mês
    const startDate = new Date(yearNum, monthNum, 1);

    // Calcula o último dia do mês
    const endDate = new Date(yearNum, monthNum + 1, 0);

    try {
      const mostPopularServices =
        await this.servicesService.getMostPopularServices(startDate, endDate);
      res.json(mostPopularServices);
    } catch (error) {
      console.error("Erro ao obter serviços mais populares:", error);
      res.status(500).json({ error: "Erro ao obter serviços mais populares" });
    }
  }

  // Adicione outros métodos conforme necessário (create, update, delete)
}
