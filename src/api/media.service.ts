import axios from "axios";
import { Post, UploadPost } from "../interfaces/post";

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
    const { data: posts } = await axios.get("/api/v1/post/get-posts");

    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = async (post: UploadPost): Promise<void> => {
  try {
    const newFiles = [];

    for (const file of post.files) {
      // Get secure url from our server
      const { data } = await axios.get("/api/v1/get-3sUrl");

      // Post the file directly to the S3 bucket
      await axios.put(data.fileUrl, file.file, {
        headers: {
          "Content-Type": file.file.type,
        },
      });
      const fileKey = data.fileKey;
      newFiles.push({
        fileName: file.file.name,
        size: file.file.size,
        mimetype: file.file.type,
        alt: file.altText,
        fileKey,
      });
    }
    // Create the post info (putting file info in its metadata) in DB
    const body = {
      caption: post.caption,
      mediaFiles: newFiles,
    };
    await axios.post("/api/v1/post/upload", body, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};
