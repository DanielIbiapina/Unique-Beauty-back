import { Professional, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProfessionalRepository {
  async findAll(): Promise<Professional[]> {
    return prisma.professional.findMany();
  }
}
