import { Router } from "express";
import { authMiddleware, adminOnly } from "../middlewares/auth-middleware";
import { AppointmentController } from "../controllers/appointment-controller";
import { ScheduleController } from "../controllers/schedule-controller";

const adminRouter = Router();
const appointmentController = new AppointmentController();
const scheduleController = new ScheduleController();
// Rota acessível apenas pelo admin
adminRouter.get(
  "/appointments/:ano/:mes/faturamento",
  authMiddleware,
  adminOnly,
  appointmentController.getFaturamentoMensal.bind(appointmentController)
);

// Rota acessível por todos os usuários autenticados
/*adminRouter.get(
  "/appointments/:id",
  authMiddleware,
  scheduleController.getScheduleSlotsByProfessional.bind(scheduleController)
);*/

export { adminRouter };
