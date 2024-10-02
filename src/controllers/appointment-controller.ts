import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment-service";

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor() {
    this.appointmentService = new AppointmentService();
  }

  async createAppointment(req: Request, res: Response) {
    try {
      const appointmentData = req.body;
      const newAppointment = await this.appointmentService.createAppointment(
        appointmentData
      );
      res.status(201).json(newAppointment);
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      res.status(500).json({ error: "Erro ao criar o agendamento" });
    }
  }

  async getAppointmentsByProfessional(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const appointments =
        await this.appointmentService.getAppointmentsByProfessional(Number(id));
      res.json(appointments);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro ao buscar agendamentos do profissional" });
    }
  }

  async getAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointment = await this.appointmentService.getAppointment(
        Number(id)
      );
      if (!appointment) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ error: "Erro ao buscar o agendamento" });
    }
  }

  async updateAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointmentData = req.body;
      const updatedAppointment =
        await this.appointmentService.updateAppointment(
          Number(id),
          appointmentData
        );
      res.json(updatedAppointment);
    } catch (error) {
      res.status(400).json({ error: "Erro ao atualizar o agendamento" });
    }
  }

  async listAppointments(req: Request, res: Response) {
    try {
      const { status, startDate, endDate } = req.query;
      const appointments = await this.appointmentService.listAppointments({
        status: status as string | undefined,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
      });
      res.json(appointments);
    } catch (error) {
      res.status(400).json({ error: "Erro ao listar os agendamentos" });
    }
  }

  async deleteAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.appointmentService.deleteAppointment(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Erro ao excluir o agendamento" });
    }
  }

  async getFaturamentoMensal(req: Request, res: Response) {
    try {
      const { ano, mes } = req.params;
      console.log(ano, mes);
      const dadosFaturamento =
        await this.appointmentService.getDadosFaturamento(
          Number(ano),
          Number(mes)
        );
      console.log(dadosFaturamento);
      res.json(dadosFaturamento);
    } catch (error) {
      res.status(400).json({ error: "Erro ao buscar os dados de faturamento" });
    }
  }

  // Remover o método getFaturamentoPorProfissional, pois agora está incluído em getDadosFaturamento
}
