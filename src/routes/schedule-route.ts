import { Router } from "express";
import { ScheduleController } from "../controllers/schedule-controller";

const scheduleRouter = Router();
const scheduleController = new ScheduleController();

scheduleRouter.post(
  "/",
  scheduleController.createScheduleSlot.bind(scheduleController)
);

scheduleRouter.get(
  "/",
  scheduleController.getScheduleSlots.bind(scheduleController)
);

scheduleRouter.get(
  "/:id",
  scheduleController.getScheduleSlotsByProfessional.bind(scheduleController)
);

scheduleRouter.put(
  "/:professionalId/:date/:startTime",
  scheduleController.updateScheduleSlot.bind(scheduleController)
);

export { scheduleRouter };
