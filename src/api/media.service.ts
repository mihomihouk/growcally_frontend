import axios from 'axios';
import { Post, UploadPost } from '../interfaces/post';
import config from '../config';

const baseURL = `${config.apiUrl}`;
interface QueryResult {
  isSuccess: boolean;
  alertMessage?: string;
  data?: any;
}

export interface UploadPostRequestPayload {
  caption: string;
  files: UploadFile;
}
export interface UploadFile {
  filename: string;
  size: number;
  mimetype: string;
  alt?: string;
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

export const getAllPosts = async (): Promise<Post[] | undefined> => {
  try {
    const { data: posts } = await axios.get(`${baseURL}/post/get-posts`);

    return posts;
  } catch (error) {
    console.log(error);
    //TODO: Error handling with Redux
    // return handleError(error)
  }
};

export const uploadPost = async (post: UploadPost): Promise<QueryResult> => {
  try {
    const formData = new FormData();
    post.files.forEach((file) => {
      formData.append('images', file.file);
      console.log(file);
      if (file.altText) {
        formData.append(`fileAltText-${file.file.name}`, file.altText);
      }
    });
    formData.append('caption', post.caption);
    formData.append('authorId', post.authorId);

    const { data } = await axios.post(`${baseURL}/post/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return handleSuccess(data);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
