import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

export function getPrisma(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: ["query", "info", "warn", "error"],
      errorFormat: "pretty",
    });
  }
  return prisma;
}

export async function connectDb(): Promise<void> {
  const client = getPrisma();
  let retries = 5;
  while (retries > 0) {
    try {
      await client.$connect();
      console.log("Conexão com o banco de dados estabelecida com sucesso.");
      return;
    } catch (error) {
      console.error(
        `Tentativa de conexão falhou. Tentativas restantes: ${retries}`
      );
      retries--;
      if (retries === 0) {
        console.error("Erro ao conectar ao banco de dados:", error);
        throw error;
      }
      // Espera 5 segundos antes de tentar novamente
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

export async function disconnectDB(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
    prisma = null;
  }
}
