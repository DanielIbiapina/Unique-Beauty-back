import { Request, Response } from "express";
import { ScheduleService } from "../services/schedule-service";

export class ScheduleController {
  private scheduleService: ScheduleService;

  constructor() {
    this.scheduleService = new ScheduleService();
  }

  async createScheduleSlot(req: Request, res: Response) {
    try {
      const { date, startTime, endTime, professionalId } = req.body;

      const scheduleSlot = await this.scheduleService.createScheduleSlot({
        date,
        startTime,
        endTime,
        professionalId: parseInt(professionalId),
      });

      res.status(201).json(scheduleSlot);
    } catch (error) {
      console.error("Erro ao criar slot de agenda:", error);
      res.status(500).json({ error: "Erro ao criar slot de agenda" });
    }
  }

  async getScheduleSlots(_req: Request, res: Response) {
    try {
      const scheduleSlots = await this.scheduleService.getScheduleSlots();
      res.status(200).json(scheduleSlots);
    } catch (error) {
      console.error("Erro ao buscar slots de agenda:", error);
      res.status(500).json({ error: "Erro ao buscar slots de agenda" });
    }
  }

  async getFilteredScheduleSlots(req: Request, res: Response) {
    try {
      const { professionalId, startDate, numberOfDays } = req.params;
      const scheduleSlots = await this.scheduleService.getFilteredScheduleSlots(
        parseInt(professionalId),
        new Date(startDate),
        parseInt(numberOfDays)
      );

      res.status(200).json(scheduleSlots);
    } catch (error) {
      console.error("Erro ao buscar slots de agenda:", error);
      res.status(500).json({ error: "Erro ao buscar slots de agenda" });
    }
  }

  async getScheduleSlotsByProfessional(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const scheduleSlots =
        await this.scheduleService.getScheduleSlotsByProfessional(parseInt(id));
      res.status(200).json(scheduleSlots);
    } catch (error) {
      console.error("Erro ao buscar slots de agenda:", error);
      res.status(500).json({ error: "Erro ao buscar slots de agenda" });
    }
  }

  async updateScheduleSlot(req: Request, res: Response) {
    try {
      const { professionalId, date, startTime } = req.params;
      const { available } = req.body;

      const scheduleSlot = await this.scheduleService.updateScheduleSlot(
        Number(professionalId),
        date,
        startTime,
        available
      );
      res.status(200).json(scheduleSlot);
    } catch (error) {
      console.error("Erro ao atualizar slot de agenda:", error);
      res.status(500).json({ error: "Erro ao atualizar slot de agenda" });
    }
  }
}
