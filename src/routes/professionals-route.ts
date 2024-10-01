import { Router } from "express";
import { ProfessionalsController } from "../controllers/professional-controller";

const professionalsRouter = Router();
const professionalsController = new ProfessionalsController();

professionalsRouter.get(
  "/",
  professionalsController.getAllProfessionals.bind(professionalsController)
);

professionalsRouter.post(
  "/",
  professionalsController.createProfessional.bind(professionalsController)
);

professionalsRouter.delete(
  "/:id",
  professionalsController.deleteProfessional.bind(professionalsController)
);

export { professionalsRouter };
