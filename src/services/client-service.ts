import { ClientRepository } from "../repositories/client-repository";
import { Client } from "@prisma/client";

export class ClientService {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  async create(data: Client): Promise<Client> {
    return this.clientRepository.create(data);
  }

  async findByPhone(
    phone: string
  ): Promise<{ name: string; id: string } | null> {
    return this.clientRepository.findByPhone(phone);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }

  async delete(id: number): Promise<void> {
    return this.clientRepository.delete(id);
  }
}
