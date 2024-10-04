import { Client, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ClientRepository {
  async findAll(): Promise<Client[]> {
    return prisma.client.findMany();
  }

  async findByPhone(
    phone: string
  ): Promise<{ name: string; id: string } | null> {
    const client = await prisma.client.findUnique({
      where: { phone },
      select: { name: true, id: true },
    });

    return client ? { name: client.name, id: client.id } : null;
  }

  async create(data: Client): Promise<Client> {
    return prisma.client.create({ data });
  }

  async delete(id: number): Promise<void> {
    await prisma.client.delete({ where: { id } });
  }
}
