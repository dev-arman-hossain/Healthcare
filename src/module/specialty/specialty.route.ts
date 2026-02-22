import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", checkAuth(Role.ADMIN, Role.DOCTOR), SpecialtyController.createSpecialty);
router.get("/", SpecialtyController.getAllSpecialties);
router.delete("/:id", checkAuth(Role.ADMIN), SpecialtyController.deleteSpecialty);

export const SpecialtyRoute = router;