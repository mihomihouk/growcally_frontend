import axios from "axios";
import { Post, UploadPost } from "../interfaces/post";
import config from "../config";

const baseURL = `${config.apiUrl}`;

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

export const getAllPosts = async (): Promise<Post[] | void> => {
  try {
    const { data: posts } = await axios.get("/post/get-posts", {
      baseURL,
    });

    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = async (post: UploadPost): Promise<void> => {
  try {
    const formData = new FormData();
    post.files.forEach((file, index) => {
      formData.append("images", file.file);
      if (file.altText) {
        formData.append(`fileAltText-${file.file.name}`, file.altText);
      }
    });
    formData.append("caption", post.caption);

    await axios.post("/post/upload", formData, {
      baseURL,
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.log(error);
  }
};
