import axios from "axios";
import { UploadPost } from "../interfaces/post";

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
export const uploadPost = async (post: UploadPost): Promise<void> => {
  try {
    if (post.files) {
      const newFiles = [];

      for (const file of post.files) {
        // Get secure url from our server
        const { data: url } = await axios.get("/api/v1/get-3sUrl");

        const formData = new FormData();
        formData.append("file", file.file);

        // Post the file directly to the S3 bucket
        await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const fileUrl = url.split("?")[0];
        newFiles.push({
          fileName: file.file.name,
          size: file.file.size,
          mimetype: file.file.type,
          alt: file.altText,
          fileUrl,
        });
      }
      // Create the post info (putting file info in its metadata) in DB
      const body = {
        caption: post.caption,
        files: newFiles,
      };
      await axios.post("/api/v1/post/upload", body, {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
