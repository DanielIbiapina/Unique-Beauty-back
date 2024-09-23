import { PrismaClient, Service } from "@prisma/client";

const prisma = new PrismaClient();

interface ServiceWithCategoryName {
  id: number;
  name: string;
  price: number;
  category: string;
}

export class ServicesRepository {
  async findAllServices(): Promise<ServiceWithCategoryName[]> {
    const services = await prisma.service.findMany({
      include: {
        category: true,
      },
    });

    return services.map((service) => ({
      id: service.id,
      name: service.name,
      price: service.price,
      category: service.category.name,
    }));
  }

  async findServiceById(id: number): Promise<ServiceWithCategoryName | null> {
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!service) return null;

    return {
      id: service.id,
      name: service.name,
      price: service.price,
      category: service.category.name,
    };
  }

  // Adicione outros métodos conforme necessário (create, update, delete)
}
