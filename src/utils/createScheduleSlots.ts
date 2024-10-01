import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function generateScheduleSlots(): Promise<void> {
  const startDate = new Date("2024-10-01T00:00:00.000Z");
  const endDate = new Date("2024-10-31T23:59:59.999Z");
  const professionals: number[] = [9, 10]; // IDs dos profissionais
  const startTime = 9; // 09:00
  const endTime = 19; // 19:00

  // Função para adicionar 30 minutos a uma data
  const addMinutes = (date: Date, minutes: number): Date => {
    return new Date(date.getTime() + minutes * 60000);
  };

  // Percorrer todos os dias de 01/10/2024 até 31/10/2024
  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dayOfWeek = currentDate.getUTCDay();

    // Verifica se é entre terça (2) e sábado (6)
    if (dayOfWeek >= 2 && dayOfWeek <= 6) {
      for (let professionalId of professionals) {
        // Gerar horários de meia em meia hora das 09:00 até as 19:00
        let currentSlotTime = new Date(
          currentDate.setHours(startTime, 0, 0, 0)
        );

        while (currentSlotTime.getHours() < endTime) {
          const nextSlotTime = addMinutes(currentSlotTime, 30);

          // Inserir no banco de dados
          await prisma.scheduleSlot.create({
            data: {
              date: new Date(currentDate.toISOString().split("T")[0]), // Apenas a data
              startTime: currentSlotTime
                .toISOString()
                .split("T")[1]
                .slice(0, 5), // Apenas a hora e minuto
              endTime: nextSlotTime.toISOString().split("T")[1].slice(0, 5), // Hora e minuto do próximo slot
              available: true,
              professionalId: professionalId,
            },
          });

          // Atualiza o currentSlotTime para o próximo intervalo de 30 minutos
          currentSlotTime = nextSlotTime;
        }
      }
    }
  }
}

generateScheduleSlots()
  .then(() => {
    console.log("Horários adicionados com sucesso.");
  })
  .catch((error: Error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
