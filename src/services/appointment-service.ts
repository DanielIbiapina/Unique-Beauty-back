import { AppointmentRepository } from "../repositories/appointment-repository";
import { Appointment, Prisma } from "@prisma/client";

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
      }>;
    }
  ): Promise<Appointment> {
    // Validar conflitos de horário
    /*const hasConflict = await this.validateAppointmentConflicts(
      appointmentData.dateTime as Date,
      appointmentData.services.map((s) => s.professionalId)
    );
    if (hasConflict) {
      throw new Error("Conflito de horário detectado");
    }*/

    // Calcular preço total
    const totalPrice = this.calculateTotalPrice(appointmentData.services);

    // Criar o agendamento
    const appointment = await this.appointmentRepository.create({
      ...appointmentData,
      totalPrice,
    });

    return appointment;
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

  /*async validateAppointmentConflicts(
    dateTime: Date,
    professionalIds: number[]
  ): Promise<boolean> {
    // Implementar lógica para verificar conflitos de horário
    // Retorna true se houver conflitos, false caso contrário
    // Esta é uma implementação simplificada, você deve adaptá-la às suas necessidades
    const existingAppointments = await this.appointmentRepository.findMany({
      startDate: new Date(dateTime.getTime() - 30 * 60000), // 30 minutos antes
      endDate: new Date(dateTime.getTime() + 30 * 60000), // 30 minutos depois
    });

    return existingAppointments.some(appointment =>
      appointment.services.some(service =>
        professionalIds.includes(service.professionalId)
      )
    );
  }*/

  calculateTotalPrice(services: Array<{ price: number }>): number {
    return services.reduce((total, service) => total + service.price, 0);
  }
}
