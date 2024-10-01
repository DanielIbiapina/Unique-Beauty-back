import { Professional } from "@prisma/client";
import { ProfessionalRepository } from "../repositories/professional-repository";

export class ProfessionalsService {
  private professionalRepository: ProfessionalRepository;

  constructor() {
    this.professionalRepository = new ProfessionalRepository();
  }

  async getAllProfessionals(): Promise<Professional[]> {
    return this.professionalRepository.findAll();
  }

  async createProfessional(data: Professional): Promise<Professional> {
    return this.professionalRepository.create(data);
  }

  async deleteProfessional(id: number): Promise<void> {
    return this.professionalRepository.delete(id);
  }
}
