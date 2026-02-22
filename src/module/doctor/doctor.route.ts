import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();

router.get("/", checkAuth(), DoctorController.getAllDoctors);

export const DoctorRoutes = router;