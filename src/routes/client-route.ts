import { Router } from "express";
import { ClientController } from "../controllers/client-controller";

const clientController = new ClientController();
const clientRouter = Router();

clientRouter.post("/", clientController.create.bind(clientController));
clientRouter.get(
  "/:phone",
  clientController.findByPhone.bind(clientController)
);
clientRouter.get("/", clientController.findAll.bind(clientController));
clientRouter.delete("/:id", clientController.delete.bind(clientController));

export { clientRouter };
