import { AppointmentRepository } from "../repositories/appointment-repository";
import { Appointment, Prisma, Service } from "@prisma/client";
import { ServicesRepository } from "../repositories/services-repository";

export class AppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = new AppointmentRepository();
  }

  async createAppointment(
    appointmentData: Omit<Prisma.AppointmentCreateInput, "services"> & {
      services: Array<{
        serviceId: number;
        professionalId: number;
        price: number;
        dateTime: Date;
      }>;
    }
  ): Promise<Appointment> {
    // Validar conflitos de horário

    // Calcular preço total
    const totalPrice = this.calculateTotalPrice(appointmentData.services);

    // Criar o agendamento
    const appointment = await this.appointmentRepository.create({
      ...appointmentData,
      totalPrice,
    });

    return appointment;
  }

  async getAppointmentsByProfessional(
    professionalId: number
  ): Promise<Appointment[]> {
    return this.appointmentRepository.getAppointmentsByProfessional(
      professionalId
    );
  }

  async getAppointment(id: number): Promise<Appointment | null> {
    return this.appointmentRepository.findById(id);
  }

  async updateAppointment(
    id: number,
    appointmentData: Prisma.AppointmentUpdateInput
  ): Promise<Appointment> {
    // Aqui você pode adicionar lógica de negócios, validações, etc.
    return this.appointmentRepository.update(id, appointmentData);
  }

  async listAppointments(params: {
    status?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Appointment[]> {
    return this.appointmentRepository.findMany(params);
  }

  async deleteAppointment(id: number): Promise<void> {
    await this.appointmentRepository.delete(id);
  }

  calculateTotalPrice(services: Array<{ price: number }>): number {
    return services.reduce((total, service) => total + service.price, 0);
  }

  async getFaturamentoMensal(ano: number, mes: number): Promise<number> {
    return this.appointmentRepository.getFaturamentoMensal(ano, mes);
  }

  async getFaturamentoPorProfissional(
    ano: number,
    mes: number
  ): Promise<
    Array<{ professionalId: number; nome: string; faturamento: number }>
  > {
    return this.appointmentRepository.getFaturamentoPorProfissional(ano, mes);
  }

  async getDadosFaturamento(
    ano: number,
    mes: number
  ): Promise<{
    faturamentoTotal: number;
    faturamentoPorProfissional: Array<{
      professionalId: number;
      nome: string;
      faturamento: number;
    }>;
  }> {
    const [faturamentoTotal, faturamentoPorProfissional] = await Promise.all([
      this.getFaturamentoMensal(ano, mes),
      this.getFaturamentoPorProfissional(ano, mes),
    ]);

    return {
      faturamentoTotal,
      faturamentoPorProfissional,
    };
  }
}
