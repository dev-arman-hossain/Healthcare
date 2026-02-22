import { stat } from "node:fs";
import { Status } from "../../../generated/prisma/enums";
import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { tokenUtils } from "../../utils/token";

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

const registerpatient = async (payload: IRegisterPatientPayload) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!data.user) {
    throw new Error("Failed to register patient");
  }

  try {
    const patient = await prisma.$transaction(async (tx) => {
      const patientProfile = await tx.patient.create({
        data: {
          userId: data.user.id,
          name: payload.name,
          email: payload.email,
        },
      });
      return patientProfile;
    });

    return {
      ...data,
      patient,
    };
  } catch (err) {
    throw new Error("Failed to register patient");
  }
};

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (data.user.status === "BLOCKED") {
    throw new Error("User is blocked");
  }
  if (data.user.isDeleted || data.user.status === Status.DELETED) {
    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });
    throw new Error("User is Deleted");
  }

  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  });

  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  });

  return {
    ...data,
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  registerpatient,
  loginUser,
};
