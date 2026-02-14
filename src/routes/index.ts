import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { SpecialtyRoute } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/specialties", SpecialtyRoute)
router.use("/users", UserRoutes)


export const IndexRoutes = router;