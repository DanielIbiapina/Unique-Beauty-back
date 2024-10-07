import { PrismaClient } from "@prisma/client";
import { Client } from "pg";

let prisma: PrismaClient | null = null;

export function getPrisma(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  return prisma;
}

export async function connectDb(): Promise<void> {
  try {
    console.log("Tentando conectar ao banco de dados usando pg...");
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    await client.connect();
    console.log("Conexão pg bem-sucedida!");
    await client.end();

    console.log("Tentando conectar usando Prisma...");
    const prismaClient = getPrisma();
    await prismaClient.$connect();
    console.log("Conexão Prisma bem-sucedida!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao conectar:", error.message);
    } else {
      console.error("Erro desconhecido ao conectar");
    }
    throw error;
  }
}

export async function disconnectDB(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
    prisma = null;
  }
}
