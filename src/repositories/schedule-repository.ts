import { PrismaClient, ScheduleSlot } from "@prisma/client";

const prisma = new PrismaClient();

export class ScheduleRepository {
  async createScheduleSlot(
    data: Omit<ScheduleSlot, "id">
  ): Promise<ScheduleSlot> {
    return prisma.scheduleSlot.create({
      data,
    });
  }

  async getScheduleSlots(): Promise<ScheduleSlot[]> {
    return prisma.scheduleSlot.findMany({
      where: {
        available: true,
      },
    });
  }

  async getScheduleSlotsByProfessional(
    professionalId: number
  ): Promise<ScheduleSlot[]> {
    return prisma.scheduleSlot.findMany({
      where: {
        professionalId,
        available: true,
      },
    });
  }

  async updateScheduleSlot(
    professionalId: number,
    date: string,
    startTime: string,
    available: boolean
  ): Promise<ScheduleSlot | null> {
    const isoDateTime = `${date}T00:00:00.000Z`;
    await prisma.scheduleSlot.updateMany({
      where: {
        professionalId,
        date: new Date(isoDateTime),
        startTime,
      },
      data: { available },
    });

    // Retorna o registro atualizado
    const updatedSlot = await prisma.scheduleSlot.findFirst({
      where: {
        professionalId,
        date: new Date(isoDateTime),
        startTime,
      },
    });

    return updatedSlot;
  }

  async getFilteredScheduleSlots(
    professionalId: number,
    startDate: Date,
    numberOfDays: number
  ): Promise<ScheduleSlot[]> {
    // Garantir que startDate seja uma data válida
    const validStartDate = new Date(startDate);
    if (isNaN(validStartDate.getTime())) {
      throw new Error("Data inicial inválida");
    }

    // Calcular a data final
    const endDate = new Date(validStartDate);
    endDate.setDate(endDate.getDate() + numberOfDays);

    return prisma.scheduleSlot.findMany({
      where: {
        professionalId,
        date: {
          gte: validStartDate,
          lt: endDate,
        },
        available: true,
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
    });
  }
}
