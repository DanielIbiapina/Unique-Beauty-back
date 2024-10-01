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
  ): Promise<ScheduleSlot> {
    const isoDateTime = `${date}T00:00:00.000Z`;
    return prisma.scheduleSlot
      .updateMany({
        where: {
          professionalId,
          date: new Date(isoDateTime),
          startTime,
        },
        data: { available },
      })
      .then(async () => {
        // Retorna o registro atualizado
        return prisma.scheduleSlot.findFirst({
          where: {
            professionalId,
            date: new Date(isoDateTime),
            startTime,
          },
        });
      });
  }
}
