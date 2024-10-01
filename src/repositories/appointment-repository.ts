import {
  PrismaClient,
  Appointment,
  Prisma,
  AppointmentService,
} from "@prisma/client";

export class AppointmentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(
    data: Prisma.AppointmentCreateInput & {
      services: Array<{
        serviceId: number;
        professionalId: number;
        price: number;
      }>;
    }
  ): Promise<Appointment> {
    return this.prisma.$transaction(async (prisma) => {
      const { services, ...appointmentData } = data;

      const appointment = await prisma.appointment.create({
        data: appointmentData,
        include: {
          client: true,
        },
      });

      const appointmentServices = await Promise.all(
        services.map((service) =>
          prisma.appointmentService.create({
            data: {
              appointmentId: appointment.id,
              serviceId: service.serviceId,
              professionalId: service.professionalId,
              price: service.price,
            },
            include: {
              service: true,
              professional: true,
            },
          })
        )
      );

      return {
        ...appointment,
        services: appointmentServices,
      };
    });
  }

  async findById(id: number): Promise<Appointment | null> {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: {
        services: {
          include: {
            service: true,
            professional: true,
          },
        },
        client: true,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.AppointmentUpdateInput
  ): Promise<Appointment> {
    return this.prisma.appointment.update({
      where: { id },
      data,
      include: {
        services: {
          include: {
            service: true,
            professional: true,
          },
        },
        client: true,
      },
    });
  }

  async findMany(params: {
    status?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Appointment[]> {
    const { status, startDate, endDate } = params;
    return this.prisma.appointment.findMany({
      where: {
        status: status,
        dateTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        services: {
          include: {
            service: true,
            professional: true,
          },
        },
        client: true,
      },
      orderBy: {
        dateTime: "asc",
      },
    });
  }

  async getAppointmentsByProfessional(
    professionalId: number
  ): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({
      where: {
        services: {
          some: { professionalId: professionalId },
        },
        status: "confirmado",
      },
      include: {
        services: {
          include: {
            service: true,
            professional: true,
          },
        },
        client: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.appointment.delete({
      where: { id },
    });
  }

  async getFaturamentoMensal(ano: number, mes: number): Promise<number> {
    const resultado = await this.prisma.appointment.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        dateTime: {
          gte: new Date(ano, mes - 1, 1),
          lt: new Date(ano, mes, 0), // Corrigido para o último dia do mês
        },
        status: "concluído",
      },
    });

    const faturamento = resultado._sum.totalPrice || 0;

    return faturamento;
  }

  async getFaturamentoPorProfissional(
    ano: number,
    mes: number
  ): Promise<
    Array<{ professionalId: number; nome: string; faturamento: number }>
  > {
    return this.prisma.$queryRaw`
      SELECT 
        ap."professionalId",
        p.name as nome,
        SUM(ap.price) as faturamento
      FROM "AppointmentService" ap
      JOIN "Professional" p ON p.id = ap."professionalId"
      JOIN "Appointment" a ON a.id = ap."appointmentId"
      WHERE 
        EXTRACT(YEAR FROM a."dateTime") = ${ano}
        AND EXTRACT(MONTH FROM a."dateTime") = ${mes}
        AND a.status = 'concluído'
      GROUP BY ap."professionalId", p.name
      ORDER BY faturamento DESC
    `;
  }

  // Métodos específicos para AppointmentServic
}
