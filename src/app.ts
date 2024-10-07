import express, { Express } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB, getPrisma } from "./config";
import { servicesRouter } from "./routes/services-route";
import { professionalsRouter } from "./routes/professionals-route";
import { appointmentRouter } from "./routes/appointment-route";
import { scheduleRouter } from "./routes/schedule-route";
import { clientRouter } from "./routes/client-route";
import { authRouter } from "./routes/auth-route";
import { adminRouter } from "./routes/admin-route";
import { userRouter } from "./routes/user-route";

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use("/services", servicesRouter)
  .use("/professionals", professionalsRouter)
  .use("/appointments", appointmentRouter)
  .use("/schedule", scheduleRouter)
  .use("/clients", clientRouter)
  .use("/auth", authRouter)
  .use("/admin", adminRouter)
  .use("/users", userRouter);

app.get("/test-db", async (_req, res) => {
  try {
    const prisma = getPrisma();
    const result = await prisma.$queryRaw<[{ now: Date }]>`SELECT NOW()`;
    res.json({
      message: "Conexão bem-sucedida",
      timestamp: result[0].now.toISOString(),
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
  }
});

export async function init(): Promise<Express> {
  loadEnv();
  console.log("Iniciando conexão com o banco de dados...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("DIRECT_URL:", process.env.DIRECT_URL);
  console.log(
    "NODE_TLS_REJECT_UNAUTHORIZED:",
    process.env.NODE_TLS_REJECT_UNAUTHORIZED
  );

  try {
    await Promise.race([
      connectDb(),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Timeout ao conectar ao banco de dados")),
          30000
        )
      ),
    ]);
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
  return app;
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
