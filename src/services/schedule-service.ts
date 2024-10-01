import { ScheduleRepository } from "../repositories/schedule-repository";

interface CreateScheduleSlotData {
  date: string;
  startTime: string;
  endTime: string;
  professionalId: number;
}

export class ScheduleService {
  private scheduleRepository: ScheduleRepository;

  constructor() {
    this.scheduleRepository = new ScheduleRepository();
  }

  async createScheduleSlot(data: CreateScheduleSlotData) {
    const { date, startTime, endTime, professionalId } = data;

    return this.scheduleRepository.createScheduleSlot({
      date: new Date(date),
      startTime,
      endTime,
      available: false,
      professionalId,
    });
  }

  async getScheduleSlots() {
    return this.scheduleRepository.getScheduleSlots();
  }

  async getScheduleSlotsByProfessional(professionalId: number) {
    return this.scheduleRepository.getScheduleSlotsByProfessional(
      professionalId
    );
  }

  async updateScheduleSlot(
    professionalId: number,
    date: string,
    startTime: string,
    available: boolean
  ) {
    return this.scheduleRepository.updateScheduleSlot(
      professionalId,
      date,
      startTime,
      available
    );
  }
}
