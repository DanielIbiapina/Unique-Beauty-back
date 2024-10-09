import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function generateScheduleSlots(): Promise<void> {
  const startDate = new Date("2024-10-01T00:00:00.000Z");
  const endDate = new Date("2024-10-27T23:59:59.999Z"); // Corrigido para 31/10
  const professionals: number[] = [1, 2]; // IDs dos profissionais

  // Função para adicionar 30 minutos a uma data
  const addMinutes = (date: Date, minutes: number): Date => {
    return new Date(date.getTime() + minutes * 60000);
  };

  // Função para formatar a data no fuso horário de Portugal
  const formatDateForPortugal = (date: Date): Date => {
    const formattedDate = new Intl.DateTimeFormat("pt-PT", {
      timeZone: "Europe/Lisbon",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);

    // Reconstruir a data no formato correto "YYYY-MM-DD" para criar um objeto Date válido
    const [day, month, year] = formattedDate.split("/");
    return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
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
        // Define o horário inicial e final para Portugal (considera horário de verão automaticamente)
        let currentSlotTime = new Date(
          currentDate.setUTCHours(8, 0, 0, 0) // Inicia às 9:00 em UTC
        );
        const endTime = new Date(currentDate.setUTCHours(18, 0, 0, 0)); // Termina às 19:00 em UTC

        while (currentSlotTime < endTime) {
          const nextSlotTime = addMinutes(currentSlotTime, 30);

          // Formatar a data para Portugal e garantir que seja compatível com o Prisma
          const formattedDate = formatDateForPortugal(currentSlotTime);

          const formattedStartTime = new Intl.DateTimeFormat("pt-PT", {
            timeZone: "Europe/Lisbon",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(currentSlotTime);

          const formattedEndTime = new Intl.DateTimeFormat("pt-PT", {
            timeZone: "Europe/Lisbon",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(nextSlotTime);

          // Inserir no banco de dados
          await prisma.scheduleSlot.create({
            data: {
              date: formattedDate, // Data válida para o Prisma
              startTime: formattedStartTime, // Hora e minuto ajustados
              endTime: formattedEndTime, // Hora e minuto ajustados
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
