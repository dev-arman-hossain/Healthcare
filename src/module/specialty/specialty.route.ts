import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";

const router = Router();

router.post("/specialities", SpecialtyController.createSpecialty);
router.get("/specialities", SpecialtyController.getAllSpecialties);
router.delete("/specialities/:id", SpecialtyController.deleteSpecialty);

export const SpecialtyRoute = router;