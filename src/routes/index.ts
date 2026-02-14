import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { SpecialtyRoute } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.route";
import { DoctorRoutes } from "../module/doctor/doctor.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/specialties", SpecialtyRoute)
router.use("/users", UserRoutes)
router.use("/doctors", DoctorRoutes)


export const IndexRoutes = router;