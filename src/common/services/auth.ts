import apiInstance from "../lib/axios";
import {
  LoginBody,
  LoginGoogleBody,
  LoginGoogleResponse,
  LoginResponse,
  VerifyGoogleAccountBody,
  VerifyGoogleAccountResponse,
} from "./auth.type";

const authService = {
  login: async ({ body }: { body: LoginBody }) => {
    return apiInstance.post<LoginResponse>("/v1/auth/login", body);
  },
  loginGoogle: async ({ body }: { body: LoginGoogleBody }) => {
    return apiInstance.post<LoginGoogleResponse>("/v1/auth/google", body);
  },
  verifyGoogleAccount: async ({ body }: { body: VerifyGoogleAccountBody }) => {
    return apiInstance.post<VerifyGoogleAccountResponse>(
      "/v1/auth/google/verify",
      body
    );
  },
};

export default authService;
