import { ServicesRepository } from "../repositories/services-repository";

interface ServiceWithCategoryName {
  id: number;
  name: string;
  price: number;
  category: string;
}

export class ServicesService {
  private servicesRepository: ServicesRepository;

  constructor() {
    this.servicesRepository = new ServicesRepository();
  }

  async getAllServices(): Promise<ServiceWithCategoryName[]> {
    return this.servicesRepository.findAllServices();
  }

  async getServiceById(id: number): Promise<ServiceWithCategoryName | null> {
    return this.servicesRepository.findServiceById(id);
  }

  async getServicesGroupedByCategory(): Promise<
    Record<string, Array<{ id: number; name: string; price: number }>>
  > {
    const services = await this.getAllServices();
    const groupedServices: Record<
      string,
      Array<{ id: number; name: string; price: number }>
    > = {};

    for (const service of services) {
      if (!groupedServices[service.category]) {
        groupedServices[service.category] = [];
      }
      groupedServices[service.category].push({
        id: service.id,
        name: service.name,
        price: service.price,
      });
    }

    return groupedServices;
  }

  async getMostPopularServices(
    startDate: Date,
    endDate: Date,
    limit: number = 3
  ): Promise<{ service: string; count: number }[]> {
    return this.servicesRepository.findMostPopularServices(
      startDate,
      endDate,
      limit
    );
  }

  // Adicione outros métodos conforme necessário (create, update, delete)
}
