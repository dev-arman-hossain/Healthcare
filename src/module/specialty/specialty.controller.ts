import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const specialty = await SpecialtyService.createSpecialty(payload);
    res.status(201).json({
      success: true,
      message: "Specialty created successfully",
      data: specialty,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Faild to create specialty",
      error: err.message,
    });
  }
};

const getAllSpecialties = async (req: Request, res: Response) => {
  try {
    const specialties = await SpecialtyService.getAllSpecialties();
    res.status(200).json({
      success: true,
      message: "Specialties fetched successfully",
      data: specialties,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Faild to fetch specialties",
      error: err.message,
    });
  }
};

const deleteSpecialty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteSpecialty = await SpecialtyService.deleteSpecialty(
      id as string,
    );
    res.status(200).json({
      success: true,
      message: "Specialty deleted successfully",
      data: deleteSpecialty,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Faild to delete specialty",
      error: err.message,
    });
  }
};

export const SpecialtyController = {
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
};
