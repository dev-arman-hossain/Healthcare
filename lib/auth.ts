import { Status } from "./../generated/prisma/enums";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role } from "../generated/prisma/enums";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  emailAndPassword: {
    enabled: true,
  },
  User: {
    role: {
      type: "string",
      required: true,
      default: Role.PATIENT,
    },
    status: {
      type: "string",
      required: true,
      default: Status.ACTIVE,
    },
    needPasswordReset: {
      type: "boolean",
      required: true,
      default: false,
    },
    isDeleted: {
      type: "boolean",
      required: true,
      default: false,
    },
    deletedAt: {
      type: "date",
      required: false,
      default: null,
    },
  },
});
