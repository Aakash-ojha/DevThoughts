import { apiClient } from "./api";

export interface Comment {
  _id: string;
  post: string;
  user: {
    _id: string;
    name: string;
  };
  text: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
}

const getComments = async (postId: string): Promise<Comment[]> => {
  const { data } = await apiClient.get(`/comment/post/${postId}`);
  return data.data;
};

const createComment = async (payload: {
  postId: string;
  text: string;
  parentComment?: string | null;
}) => {
  const { data } = await apiClient.post("/comment", payload);
  return data.data;
};

const toggleLikeComment = async (commentId: string) => {
  const { data } = await apiClient.patch(`/comment/${commentId}/like`);
  return data.data;
};

export { getComments, createComment, toggleLikeComment };
