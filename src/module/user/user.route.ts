import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/create-doctor", checkAuth(Role.ADMIN), UserController.createDoctor);

export const UserRoutes = router;