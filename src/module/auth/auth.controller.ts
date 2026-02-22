import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import { tokenUtils } from "../../utils/token";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const patient = await AuthService.registerPatient(req.body);
  const { accessToken, refreshToken, token, ...rest } = patient;


   tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Patient registered successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const patient = await AuthService.loginUser(req.body);
  const { accessToken, refreshToken, token, ...rest } = patient;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Patient logged in successfully",
    data: {
      token, accessToken, refreshToken,
      ...rest,
    },
  });
});

export const authController = { registerPatient, loginUser };
