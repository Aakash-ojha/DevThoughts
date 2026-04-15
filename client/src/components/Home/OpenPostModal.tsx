import { useState } from "react";
import { Send, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "../ui/textarea";
import type { Post } from "@/types/postType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, getComments } from "@/api/commentApi";

interface AuthorHeaderProps {
  name: string;
  createdAt: string;
  onClose: () => void;
}

// ✅ Declared OUTSIDE the main component
function AuthorHeader({ name, createdAt, onClose }: AuthorHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b p-3.5 bg-white/90 backdrop-blur sticky top-0 z-10">
      <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold shrink-0">
        {name.charAt(0)}
      </div>
      <div className="flex-1">
        <h2 className="font-bold text-slate-900">{name}</h2>
        <p className="text-xs text-slate-500">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      <button
        onClick={onClose}
        className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  );
}

interface OpenPostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export default function OpenPostModal({
  post,
  isOpen,
  onClose,
}: OpenPostModalProps) {
  const [showFullCode, setShowFullCode] = useState(false);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState<"post" | "comments">("post");

  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", post._id],
    queryFn: () => getComments(post._id),
  });

  const createCommentMutation = useMutation({
    mutationFn: createComment,

    onSuccess: () => {
      setComment("");

      // 🔥 refresh comments instantly
      queryClient.invalidateQueries({
        queryKey: ["comments", post._id],
      });
    },
  });

  const lines = post.codeSnippet?.split("\n") || [];
  const displayedCode = showFullCode
    ? post.codeSnippet
    : lines.slice(0, 10).join("\n");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          xl:max-w-280! lg:max-w-250! md:max-w-180! sm:max-w-140!
          md:h-[82vh] h-[95vh]
          flex md:flex-row flex-col
          border-none shadow-2xl rounded-lg
          bg-white p-0
          overflow-hidden
        "
        showCloseButton={false}
      >
        {/* ── MOBILE LAYOUT ── */}
        <div className="flex flex-col h-full lg:hidden w-full">
          <AuthorHeader
            name={post.author.name}
            createdAt={post.createdAt}
            onClose={() => onClose(false)}
          />

          {/* Tab bar */}
          <div className="flex border-b bg-white sticky top-0 z-10">
            <button
              onClick={() => setActiveTab("post")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === "post"
                  ? "text-violet-600 border-b-2 border-violet-600"
                  : "text-slate-500"
              }`}
            >
              Post
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === "comments"
                  ? "text-violet-600 border-b-2 border-violet-600"
                  : "text-slate-500"
              }`}
            >
              Comments{" "}
              <span className="text-violet-500 bg-violet-50 px-1.5 py-0.5 rounded-full text-xs ml-1">
                {comments.length}
              </span>
            </button>
          </div>

          {/* Post tab */}
          {activeTab === "post" && (
            <div className="flex-1 overflow-y-auto p-3">
              <h1 className="text-3xl font-black text-slate-900 mb-4">
                {post.title}
              </h1>
              <p className="text-slate-600 mb-8">{post.content}</p>

              {post.codeSnippet && (
                <div className="rounded-xl border bg-slate-950 shadow-inner">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      Main Snippet
                    </span>
                    {lines.length > 10 && (
                      <button
                        onClick={() => setShowFullCode(!showFullCode)}
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        {showFullCode ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <pre className="p-6 text-sm font-mono text-slate-300 leading-relaxed">
                      <code>{displayedCode}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Comments tab */}
          {activeTab === "comments" && (
            <div className="flex flex-col flex-1 overflow-hidden bg-slate-50">
              <ScrollArea className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-5">
                  {comments.map((c: any) => (
                    <div key={c._id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          {c.user?.name}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 bg-white/90 backdrop-blur border-t">
                <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add your thoughts..."
                    className="flex-1 bg-transparent border-none text-sm px-2 outline-none"
                  />
                  <button
                    onClick={() => {
                      if (!comment.trim()) return;

                      createCommentMutation.mutate({
                        postId: post._id,
                        text: comment,
                        parentComment: null,
                      });
                    }}
                    disabled={createCommentMutation.isPending}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-700 text-white"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden lg:flex flex-row h-full w-full">
          {/* LEFT SIDE */}
          <div className="min-w-[65%] flex flex-col md:h-full bg-white md:overflow-hidden">
            <AuthorHeader
              name={post.author.name}
              createdAt={post.createdAt}
              onClose={() => onClose(false)}
            />
            <div className="flex-1 p-3 overflow-y-auto">
              <h1 className="text-3xl font-black text-slate-900 mb-4">
                {post.title}
              </h1>
              <p className="text-slate-600 mb-8">{post.content}</p>

              {post.codeSnippet && (
                <div className="rounded-xl border bg-slate-950 shadow-inner">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      Main Snippet
                    </span>
                    {lines.length > 10 && (
                      <button
                        onClick={() => setShowFullCode(!showFullCode)}
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        {showFullCode ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <pre className="p-6 text-sm font-mono text-slate-300 leading-relaxed">
                      <code>{displayedCode}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <aside className="w-full bg-slate-50 border-l flex flex-col lg:h-full min-w-[30%]">
            <div className="p-4.5 border-b bg-white/90 backdrop-blur sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">
                  Comments{" "}
                  <span className="text-violet-500 bg-violet-50 px-2 py-0.5 rounded-full text-xs ml-1">
                    {comments.length}
                  </span>
                </h3>
                <button
                  onClick={() => onClose(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-5">
                {comments.map((c: any) => (
                  <div key={c._id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {c.user?.name}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 bg-white/90 backdrop-blur border-t sticky bottom-0 z-10">
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-2 border border-slate-200">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your thoughts..."
                  className="flex-1 bg-transparent border-none text-sm px-2 outline-none"
                />
                <button
                  onClick={() => {
                    if (!comment.trim()) return;

                    createCommentMutation.mutate({
                      postId: post._id,
                      text: comment,
                      parentComment: null,
                    });
                  }}
                  disabled={createCommentMutation.isPending}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-700 text-white"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
