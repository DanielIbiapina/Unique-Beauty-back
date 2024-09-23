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

  async delete(id: number): Promise<void> {
    await this.prisma.appointment.delete({
      where: { id },
    });
  }

  // Métodos específicos para AppointmentServic
}
