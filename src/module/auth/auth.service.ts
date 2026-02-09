import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

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

  //   const patient = await prisma.$transaction(async (tx) => {

  //   })

  return data;
};

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  const result = await prisma.user.findUnique({
    where: {
      id: data.user.id,
    },
  });

  if (data.user.status === "BLOCKED") {
    throw new Error("User is blocked");
  }

  return data;
};

export const AuthService = {
  registerpatient,
  loginUser,
};
