import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB } from "./config";
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
  .use("/users", userRouter)
  // Middleware de erro
  .use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Erro não capturado:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  });

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
