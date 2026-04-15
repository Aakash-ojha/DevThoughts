export interface Author {
  _id: string;
  name: string;
  username?: string;
  avatar?: string;
}

export interface Tag {
  _id: string;
  name: string;
  color: string;
  slug?: string;
}

/**
 * Individual Comment structure
 */
export interface Comment {
  _id: string;
  user: Author; // Populated user object
  text: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  codeSnippet?: string;
  image: string[];
  author: Author;
  tags: Tag[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export type CreatePostData = {
  title: string;
  content: string;
  codeSnippet?: string;
  image?: string[];
  tags?: string[];
};

export interface ITrendingTag {
  name: string;
  color: string;
  slug: string;
  count: number;
}
