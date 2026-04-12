import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { usePostStore } from "@/store/usePostStore";
import getInitailName from "@/utlis/getInitialName";
import { Code, Image as ImageIcon, Hash, Globe2, X } from "lucide-react";
import { getTags, type ITag } from "@/api/getTags";
import { createPost } from "@/api/postapi";

export function CreatePostModal() {
  const { isOpen, closeModal } = usePostStore();
  const user = useAuthStore((state) => state.user);

  const [content, setContent] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImage] = useState<File[]>([]);

  const [tags, setTags] = useState<ITag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [showTagInput, setShowTagInput] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tagArray = await getTags();
        // console.log(tagArray);
        setTags(tagArray);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const PostData = {
        title: content.slice(0, 50) || "Untitled Post",
        content,
        tags: selectedTagIds,
        codeSnippet: codeSnippet || undefined,
      };

      const result = await createPost(PostData);
      console.log("Post created:", result);

      // reset state
      setContent("");
      setImage([]);
      setCodeSnippet("");
      setSelectedTagIds([]);
      setShowCodeInput(false);
      setShowTagInput(true);

      closeModal();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
      // Reset your states here when it CLOSES
      setContent("");
      setImage([]);
      setCodeSnippet("");
      setSelectedTagIds([]);
      setShowTagInput(true); // Prep it for the next time it opens
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    console.log(selectedFiles);

    if (!selectedFiles) return;

    const validFiles = selectedFiles.filter((file) => {
      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} is too large (max 2MB)`);
        return false;
      }
      return true;
    });
    setImage((prev) => [...prev, ...validFiles]);

    //  Reset input value to select the same files again if needed
    e.target.value = "";
  };

  const userName = useMemo(() => {
    const name = getInitailName(user?.name);
    return name;
  }, [user?.name]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-137.5 p-0 overflow-hidden gap-0 no-scrollbar">
        <form onSubmit={handleSubmit} className="flex flex-col ">
          {/* Header */}
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-center text-sm font-semibold">
              Create Post
            </DialogTitle>
          </DialogHeader>

          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
            {/* User Info Section */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.profilePicture} className="grayscale" />
                <AvatarFallback>{userName}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{user?.name}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-[10px] gap-1 rounded-full text-muted-foreground"
                >
                  <Globe2 className="w-3 h-3" /> Anyone
                </Button>
              </div>
            </div>

            {/* Main Content Area */}
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-none focus-visible:ring-0 text-lg resize-none min-h-30 p-0 placeholder:text-muted-foreground"
            />

            {/* Conditional Code Snippet Section */}
            {showCodeInput && (
              <div className="relative group rounded-lg overflow-y-auto border bg-slate-950">
                <div className="flex justify-between items-center px-3 py-1 bg-slate-900 text-[10px] text-slate-400">
                  <span>Code Snippet</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-white"
                    onClick={() => {
                      setShowCodeInput(false);
                      setCodeSnippet("");
                    }}
                  />
                </div>
                <Textarea
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="// Paste your code here..."
                  className="font-mono text-sm bg-transparent border-none focus-visible:ring-0 text-green-400 min-h-25 resize-none"
                />
              </div>
            )}

            <div className="flex flex-row gap-3 overflow-x-auto overflow px-5 pb-3">
              {images.map((img, i) => (
                <div key={i} className="relative shrink-0">
                  <img
                    className="w-full h-50 object-cover rounded-2xl"
                    src={URL.createObjectURL(img)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImage(images.filter((_, idx) => idx !== i))
                    }
                    className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3 text-white cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div className="flex flex-wrap gap-2 pt-3 ">
                {showTagInput &&
                  tags.map((t) => {
                    const isSelected = selectedTagIds.includes(t._id);
                    return (
                      <Button
                        type="button"
                        key={t.slug}
                        variant={isSelected ? "default" : "outline"}
                        className={isSelected ? "" : ""}
                        onClick={() => {
                          setSelectedTagIds((prev) => {
                            return prev.includes(t._id)
                              ? prev.filter((id) => id !== t._id)
                              : [...prev, t._id];
                          });
                        }}
                      >
                        #{t?.name}
                      </Button>
                    );
                  })}
              </div>
              {selectedTagIds.length === 0 &&
                (content.trim() || images.length > 0 || codeSnippet.trim()) && (
                  <p className="text-[10px] mt-2 text-red-500 animate-in fade-in slide-in-from-top-1">
                    At least one #tag is required to post
                  </p>
                )}
            </div>
          </div>

          {/* Bottom Toolbar */}
          <div className="p-4 flex items-center justify-between border-t">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-primary/20 rounded-full"
                onClick={() => setShowCodeInput(true)}
              >
                <Code className="w-5 h-5" />
              </Button>

              <input
                type="file"
                size={16}
                multiple
                className="hidden"
                onChange={handleChangeImage}
                ref={fileInputRef}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-primary/20 rounded-full"
              >
                <ImageIcon className="w-5 h-5" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowTagInput(!showTagInput)}
                size="icon"
                className={`${showTagInput ? "text-primary bg-primary/20" : "text-muted-foreground"} hover:bg-primary/10 rounded-full`}
              >
                <input type="file" className="hidden" />
                <Hash className="w-5 h-5" />
              </Button>
            </div>

            <Button
              type="submit"
              disabled={
                (!content.trim() &&
                  !codeSnippet.trim() &&
                  images.length === 0) ||
                selectedTagIds.length === 0
              }
              className="rounded-full px-6 font-semibold"
            >
              Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
