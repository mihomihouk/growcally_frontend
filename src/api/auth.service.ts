import axios, { AxiosResponse } from 'axios';
import config from '../config';

const baseURL = config.apiUrl;

export interface SignUpParams {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  data: string;
}

export const registerUser = async (
  signUpParams: SignUpParams
): Promise<AxiosResponse<SignUpResponse>> => {
  return await axios.post<SignUpResponse>(
    `${baseURL}/auth/signup`,
    signUpParams
  );
};

export interface VerifyUserParams {
  email: string;
  verificationCode: string;
}

export const verifyEmail = async (
  verifyUserParams: VerifyUserParams
): Promise<void> => {
  return await axios.post(`${baseURL}/auth/verify`, verifyUserParams);
};

export const resendVerificationCode = async (email: string): Promise<void> => {
  return await axios.post(`${baseURL}/auth/resend-code`, { email });
};
