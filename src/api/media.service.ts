import axios from 'axios';
import { UploadPost } from '../interfaces/post';
import config from '../config';
import { store } from '../store/store';
import { updatePost } from '../slices/posts-slice';
import { updateUser } from '../slices/auth-slice';

const baseURL = `${config.apiUrl}`;
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

export const getAllPosts = async (userId: string): Promise<QueryResult> => {
  try {
    const { data: posts } = await axios.get(`${baseURL}/post/get-posts`, {
      params: { userId },
      withCredentials: true
    });
    return handleSuccess(posts);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

interface UploadPostParams {
  post: UploadPost;
  userId: string;
}

export const uploadPost = async (
  uploadPostParams: UploadPostParams
): Promise<QueryResult> => {
  try {
    const { post, userId } = uploadPostParams;
    const formData = new FormData();
    post.files.forEach((file) => {
      formData.append('images', file.file);
      if (file.altText) {
        formData.append(`fileAltText-${file.file.name}`, file.altText);
      }
    });
    formData.append('caption', post.caption);
    formData.append('authorId', post.authorId);

    const { data } = await axios.post(`${baseURL}/post/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { userId },
      withCredentials: true
    });
    return handleSuccess(data);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

interface LikePostParams {
  userId: string;
  postId: string;
}

export const likePost = async (
  likePostParams: LikePostParams
): Promise<QueryResult> => {
  try {
    const { userId, postId } = likePostParams;
    const { data } = await axios.put(
      `${baseURL}/post/like`,
      { postId },
      {
        params: { userId },
        withCredentials: true
      }
    );
    const likedPostParams = {
      totalLikes: data.totalLikes
    };
    store.dispatch(updatePost({ postId, likedPostParams }));
    const updatedUserParams = {
      likedPosts: data.likedPostsIds
    };
    store.dispatch(updateUser(updatedUserParams));
    return handleSuccess(data);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

//TODO: unlike
