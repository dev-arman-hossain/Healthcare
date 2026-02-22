import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { ICreateSpecialtyPayload } from "./specialty.interface";

const createSpecialty = async (payload: ICreateSpecialtyPayload): Promise<Specialty> => {
  const specialty = await prisma.specialty.create({ data: payload });
  return specialty;
};

const getAllSpecialties = async (): Promise<Specialty[]> => {
  const specialties = await prisma.specialty.findMany({});
  return specialties;
};

const deleteSpecialty = async (id: string): Promise<Specialty> => {
  const specialty = await prisma.specialty.delete({ where: { id } });
  return specialty;
};

export const SpecialtyService = {
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
};