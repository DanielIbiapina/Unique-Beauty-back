import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ServiceWithCategoryName {
  id: number;
  name: string;
  price: number;
  duration: number; // Adicionando a propriedade duration
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
      duration: service.duration,
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
      duration: service.duration,
      category: service.category.name,
    };
  }

  async findMostPopularServices(
    startDate: Date,
    endDate: Date,
    limit: number = 3
  ): Promise<{ service: string; count: number }[]> {
    const popularServices = await prisma.appointmentService.groupBy({
      by: ["serviceId"],
      where: {
        appointment: {
          dateTime: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
      _count: {
        serviceId: true,
      },
      orderBy: {
        _count: {
          serviceId: "desc",
        },
      },
      take: limit,
    });

    if (popularServices.length === 0) {
      return [];
    }

    const servicesWithNames = await Promise.all(
      popularServices.map(async (item) => {
        const service = await prisma.service.findUnique({
          where: { id: item.serviceId },
          select: { name: true },
        });
        return {
          service: service?.name || "Serviço Desconhecido",
          count: item._count.serviceId,
        };
      })
    );

    return servicesWithNames;
  }

  // Adicione outros métodos conforme necessário (create, update, delete)
}
