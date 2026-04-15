import type { CreatePostData, ITrendingTag } from "@/types/postType";
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

const getPosts = async function (page = 1, limit = 5, tag?: string) {
  try {
    const url = tag
      ? `/post/getpost?page=${page}&limit=${limit}&tag=${tag}` // with tag
      : `/post/getpost?page=${page}&limit=${limit}`; // without tag

    const response = await apiClient.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getTrendingTags = async (): Promise<ITrendingTag[]> => {
  const { data } = await apiClient.get("/tags/trending");
  return data.data;
};

export { createPost, getPosts, getTrendingTags };
