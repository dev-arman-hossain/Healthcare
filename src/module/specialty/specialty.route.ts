import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";


const router = Router()


router.post("/specialities", SpecialtyController.createSpecialty)


export const SpecialtyRoute = router