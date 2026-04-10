import type { CreatePostData } from "@/types/postType";
import { apiClient } from "./api";

const createPost = async function (PostData: CreatePostData) {
  try {
    const response = await apiClient.post("/post", PostData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export { createPost };
