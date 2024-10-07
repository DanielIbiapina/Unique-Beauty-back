import { Router } from "express";
import { AppointmentController } from "../controllers/appointment-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

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

//Obter agendamentos de um profissional
appointmentRouter.get(
  "/professional/:id",
  appointmentController.getAppointmentsByProfessional.bind(
    appointmentController
  )
);

// Obter um agendamento específico por ID
appointmentRouter.get(
  "/:id",
  authMiddleware,
  appointmentController.getAppointment
);

// Substituir as duas rotas de faturamento por uma única rota

// Remover a rota getFaturamentoPorProfissional, pois agora está incluída em getFaturamentoMensal
// appointmentRouter.get(
//   "/:ano/:mes/faturamento/profissional",
//   appointmentController.getFaturamentoPorProfissional.bind(
//     appointmentController
//   )
// );

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
