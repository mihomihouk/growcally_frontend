import axios from 'axios';
import config from '../config';
import { store } from '../store/store';
import {
  resetAuth,
  setIsAuthenticated,
  setUser,
  updateUser
} from '../slices/auth-slice';
import { resetModal } from '../slices/modals-slice';
import { handleError, handleSuccess } from '../util/api-result-handler';
import {
  setUserProfile,
  setUserProfilePosts
} from '../slices/user-profile-slice';

const baseURL = config.apiUrl;

interface QueryResult {
  isSuccess: boolean;
  alertMessage?: string;
  data?: any;
}

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

export const resendVerificationCode = async (
  email: string
): Promise<QueryResult> => {
  try {
    const { data } = await axios.post(`${baseURL}/auth/resend-code`, { email });
    return handleSuccess(data);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
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
    store.dispatch(setUser(data.updatedUser));
    store.dispatch(setIsAuthenticated(true));
    const result = handleSuccess(data);
    return result;
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const logoutUser = async (userId: string): Promise<QueryResult> => {
  try {
    await axios.post(
      `${baseURL}/auth/logout`,
      { userId },
      {
        withCredentials: true
      }
    );
    store.dispatch(resetAuth());
    store.dispatch(resetModal());
    return handleSuccess();
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

interface FetchUserParams {
  targetUserId: string;
  currentUserId: string;
}

export const fetchUserDetail = async (
  fetchUserParams: FetchUserParams
): Promise<QueryResult> => {
  try {
    const { targetUserId, currentUserId } = fetchUserParams;
    const { data } = await axios.get(`${baseURL}/auth/${targetUserId}`, {
      params: { userId: currentUserId },
      withCredentials: true
    });
    store.dispatch(setUserProfile(data.user));
    store.dispatch(setUserProfilePosts(data.posts));
    return handleSuccess(data);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

interface UpdateProfileParams {
  thumbnail?: File;
  bio: string;
  userId: string;
}
export const updateProfile = async (
  updateProfileParams: UpdateProfileParams
): Promise<QueryResult> => {
  try {
    const { bio, userId, thumbnail } = updateProfileParams;
    const formData = new FormData();
    if (thumbnail) {
      formData.append('image', thumbnail);
    }
    if (bio) {
      formData.append('bio', bio);
    }
    const { data } = await axios.put(`${baseURL}/auth/profile`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { userId },
      withCredentials: true
    });
    store.dispatch(updateUser(data.user));
    return handleSuccess(data);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
