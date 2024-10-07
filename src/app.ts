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
import { PrismaClient } from "@prisma/client";

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

app.get("/test-db", async (req, res) => {
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
  await connectDb();
  console.log("Variável de ambiente DATABASE_URL:", process.env.DATABASE_URL);
  return app;
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
