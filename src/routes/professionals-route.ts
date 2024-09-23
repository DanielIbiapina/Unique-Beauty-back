import { Router } from "express";
import { ProfessionalsController } from "../controllers/professional-controller";

const professionalsRouter = Router();
const professionalsController = new ProfessionalsController();

professionalsRouter.get(
  "/",
  professionalsController.getAllProfessionals.bind(professionalsController)
);

export { professionalsRouter };
