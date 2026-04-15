import { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Maximize2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/types/postType";
import OpenPostModal from "./OpenPostModal";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ IMPORTANT: use backend-provided count
  const commentCount = post.commentCount || 0;
  const likeCount = post.likes?.length || 0;

  const lines = post.codeSnippet?.split("\n") || [];
  const isLongCode = lines.length > 5;

  const displayCode = isLongCode
    ? lines.slice(0, 5).join("\n")
    : post.codeSnippet;

  return (
    <>
      <div className="border border-slate-200 rounded-xl p-4 bg-white hover:border-slate-300 transition-all shadow-sm">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-violet-100 text-violet-700">
              {post.author?.name?.charAt(0) || "U"}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                {post.author?.name}
              </p>
              <p className="text-xs text-slate-400">
                {post.createdAt &&
                  formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
              </p>
            </div>
          </div>

          <button className="text-slate-400 hover:bg-slate-100 p-1.5 rounded-lg">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* TITLE + CONTENT */}
        <h3 className="text-sm font-bold mb-1 text-slate-900">{post.title}</h3>

        <p className="text-sm text-slate-600 mb-3 line-clamp-3">
          {post.content}
        </p>

        {/* CODE SNIPPET */}
        {post.codeSnippet && (
          <div className="relative mb-3">
            <div className="bg-slate-950 text-slate-300 rounded-lg p-3 font-mono text-[11px] border border-slate-800">
              <pre>
                <code>{displayCode}</code>
              </pre>

              {isLongCode && (
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-slate-950 to-transparent flex items-end justify-center pb-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    <Maximize2 size={12} /> View Full Code
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map((tag) => (
            <span
              key={tag._id}
              className="text-[10px] text-blue-600 px-2 py-0.5 rounded-md font-bold uppercase bg-blue-50"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
          {/* LEFT ACTIONS */}
          <div className="flex items-center gap-1">
            {/* LIKE */}
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs min-w-18 ${
                liked
                  ? "bg-rose-50 text-rose-500"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              <span className="tabular-nums">
                {liked ? likeCount + 1 : likeCount}
              </span>
            </button>

            {/* COMMENTS */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-100 min-w-18"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="tabular-nums">{commentCount}</span>
            </button>

            {/* SHARE */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-100">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* SAVE */}
          <button
            onClick={() => setSaved(!saved)}
            className={`p-2 rounded-lg ${
              saved
                ? "text-violet-600 bg-violet-50"
                : "text-slate-400 hover:bg-slate-100"
            }`}
          >
            <Bookmark size={18} className={saved ? "fill-current" : ""} />
          </button>
        </div>
      </div>

      {/* MODAL */}
      <OpenPostModal
        post={post}
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
      />
    </>
  );
}
