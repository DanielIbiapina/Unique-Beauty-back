import express, { Express } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB } from "./config";
import { servicesRouter } from "./routes/services-route";
import { professionalsRouter } from "./routes/professionals-route";
import { appointmentRouter } from "./routes/appointment-route";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/services", servicesRouter)
  .use("/professionals", professionalsRouter)
  .use("/appointments", appointmentRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
