import { Router } from "express";
import { AppointmentController } from "../controllers/appointment-controller";

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

// Criar um novo agendamento
appointmentRouter.post(
  "/",
  appointmentController.createAppointment.bind(appointmentController)
);

// Obter todos os agendamentos
appointmentRouter.get(
  "/",
  appointmentController.listAppointments.bind(appointmentController)
);

// Obter um agendamento específico por ID
appointmentRouter.get(
  "/:id",
  appointmentController.getAppointment.bind(appointmentController)
);

// Atualizar um agendamento existente
appointmentRouter.put(
  "/:id",
  appointmentController.updateAppointment.bind(appointmentController)
);

// Excluir um agendamento
appointmentRouter.delete(
  "/:id",
  appointmentController.deleteAppointment.bind(appointmentController)
);

export { appointmentRouter };
