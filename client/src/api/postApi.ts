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

const getPosts = async function (page = 1, limit = 5) {
  try {
    const response = await apiClient.get(
      `/post/getpost?page=${page}&limit=${limit}`,
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { createPost, getPosts };
