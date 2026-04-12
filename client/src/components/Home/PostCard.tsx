import { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/types/postType"; // Import the interface we created

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Use array length for counts since your DB sends arrays
  const likeCount = post.likes?.length || 0;
  const commentCount = post.comments?.length || 0;

  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white hover:border-slate-300 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar - Generate initials from author.name */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-violet-100 text-violet-700">
            {post.author.name.charAt(0)}
          </div>

          <div>
            {/* FIXED: Accessing .name instead of the whole object */}
            <p className="text-sm font-semibold text-slate-800">
              {post.author.name}
            </p>
            <p className="text-xs text-slate-400">
              {/* FIXED: Using date-fns for the MongoDB timestamp */}
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <h3 className="text-sm font-bold mb-1">{post.title}</h3>
      <p className="text-sm text-slate-700 leading-relaxed mb-3">
        {post.content}
      </p>

      {/* FIXED: Use codeSnippet to match your MongoDB Schema */}
      {post.codeSnippet && (
        <div className="bg-slate-950 text-green-400 rounded-lg p-3 font-mono text-xs mb-3 overflow-x-auto">
          <pre>{post.codeSnippet}</pre>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3 mt-3">
        {post.tags.map((tag) => (
          <span
            key={tag._id}
            className="text-xs text-blue-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-blue-100/65"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      <div className="border-t border-slate-100 mb-3" />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              liked
                ? "bg-rose-50 text-rose-500"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            {liked ? likeCount + 1 : likeCount}
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 transition-all">
            <MessageCircle className="w-4 h-4" />
            {commentCount}
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 transition-all">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        <button
          onClick={() => setSaved(!saved)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            saved
              ? "text-violet-600 bg-violet-50"
              : "text-slate-400 hover:bg-slate-100"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>
    </div>
  );
}
