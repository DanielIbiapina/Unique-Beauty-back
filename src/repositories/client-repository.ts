import { Client, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ClientRepository {
  async findAll(): Promise<Client[]> {
    return prisma.client.findMany();
  }

  async findByPhone(phone: string): Promise<string | null> {
    const client = await prisma.client.findUnique({
      where: { phone },
      select: { name: true },
    });
    return client ? client.name : null;
  }

  async create(data: Client): Promise<Client> {
    return prisma.client.create({ data });
  }

  async delete(id: number): Promise<void> {
    await prisma.client.delete({ where: { id } });
  }
}
