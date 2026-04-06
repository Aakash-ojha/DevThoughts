import { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

interface Post {
  id: number;
  name: string;
  username: string;
  initials: string;
  avatarColor: string;
  time: string;
  content: string;
  code?: string;
  tags: string[];
  likes: number;
  comments: number;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white hover:border-slate-300 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${post.avatarColor}`}
          >
            {post.initials}
          </div>

          {/* Name + time */}
          <div>
            <p className="text-sm font-semibold text-slate-800">{post.name}</p>
            <p className="text-xs text-slate-400">
              @{post.username} · {post.time}
            </p>
          </div>
        </div>

        {/* More options */}
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <p className="text-sm text-slate-700 leading-relaxed mb-3">
        {post.content}
      </p>

      {/* Code block (optional) */}
      {post.code && (
        <div className="bg-slate-950 text-green-400 rounded-lg p-3 font-mono text-xs mb-3 overflow-x-auto">
          <pre>{post.code}</pre>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 font-medium cursor-pointer hover:bg-violet-100 transition-all"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 mb-3" />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              liked
                ? "bg-violet-50 text-violet-600"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            {likes}
          </button>

          {/* Comment */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 transition-all">
            <MessageCircle className="w-4 h-4" />
            {post.comments}
          </button>

          {/* Share */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 transition-all">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Save */}
        <button
          onClick={() => setSaved(!saved)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            saved
              ? "text-violet-600 bg-violet-50"
              : "text-slate-400 hover:bg-slate-100"
          }`}
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
