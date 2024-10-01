import { Professional, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProfessionalRepository {
  async findAll(): Promise<Professional[]> {
    return prisma.professional.findMany();
  }

  async create(data: Professional): Promise<Professional> {
    return prisma.professional.create({ data });
  }

  async delete(id: number): Promise<void> {
    await prisma.professional.delete({ where: { id } });
  }
}
