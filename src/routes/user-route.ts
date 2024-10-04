import { Router } from "express";
import { authMiddleware, adminOnly } from "../middlewares/auth-middleware";

import { UserController } from "../controllers/user-controller";

const userController = new UserController();
const userRouter = Router();

userRouter.post(
  "/create",
  authMiddleware,
  adminOnly,
  userController.createUser.bind(userController)
);

export { userRouter };
