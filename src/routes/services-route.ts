import { Router } from "express";
import { ServicesController } from "../controllers/services-controller";

const servicesRouter = Router();
const servicesController = new ServicesController();

// Rota para obter serviços agrupados por categoria
servicesRouter.get(
  "/grouped",
  servicesController.getServicesGroupedByCategory.bind(servicesController)
);

// Rota para obter todos os serviços
servicesRouter.get(
  "/",
  servicesController.getAllServices.bind(servicesController)
);

// Rota para obter um serviço específico por ID
servicesRouter.get(
  "/:id",
  servicesController.getServiceById.bind(servicesController)
);

// Rota para obter serviços mais populares
servicesRouter.get(
  "/most-popular/:year/:month",
  servicesController.getMostPopularServices.bind(servicesController)
);

// Adicione outras rotas conforme necessário, por exemplo:
// servicesRouter.post("/", servicesController.createService.bind(servicesController));
// servicesRouter.put("/:id", servicesController.updateService.bind(servicesController));
// servicesRouter.delete("/:id", servicesController.deleteService.bind(servicesController));

export { servicesRouter };
