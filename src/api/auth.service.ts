import axios from 'axios';
import config from '../config';
import { store } from '../store/store';
import { setIsAuthenticated, setUser } from '../slices/auth-slice';

const baseURL = config.apiUrl;

interface QueryResult {
  isSuccess: boolean;
  alertMessage?: string;
  data?: any;
}

const handleSuccess = (data: any) => {
  return {
    isSuccess: true,
    data
  };
};

const handleError = (error: any) => {
  const message = error.response.data.message;

  return {
    isSuccess: false,
    alertMessage: message
  };
};

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
): Promise<QueryResult> => {
  try {
    const { data } = await axios.post<SignUpResponse>(
      `${baseURL}/auth/signup`,
      signUpParams
    );
    const result = handleSuccess(data);
    return result;
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export interface VerifyUserParams {
  email: string;
  verificationCode: string;
}

export const verifyEmail = async (
  verifyUserParams: VerifyUserParams
): Promise<QueryResult> => {
  try {
    const { data } = await axios.post(
      `${baseURL}/auth/verify`,
      verifyUserParams
    );
    return handleSuccess(data);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const resendVerificationCode = async (email: string): Promise<void> => {
  return await axios.post(`${baseURL}/auth/resend-code`, { email });
  //TODO: Add error and success handle
};

export interface LoginUserParams {
  email: string;
  password: string;
}

export const loginUser = async (
  loginUserParams: LoginUserParams
): Promise<QueryResult> => {
  try {
    const { data, headers } = await axios.post(
      `${baseURL}/auth/login`,
      loginUserParams,
      { withCredentials: true }
    );
    const cookie = headers['set-cookie'];
    document.cookie = 'access_token' + cookie;
    // Store data in Redux
    store.dispatch(setUser(data.user));
    store.dispatch(setIsAuthenticated(true));
    const result = handleSuccess(data);
    return result;
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
