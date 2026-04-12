import { getPosts } from "@/api/postApi.js";
import PostCard from "./PostCard";
import { useEffect, useRef, useState } from "react";

export default function PostFeed() {
  const [postItem, setPostItem] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true); // ← add this
  const pageRef = useRef(1); // ← add this

  useEffect(() => {
    const mainEl = document.querySelector("main") as HTMLElement;

    const handleScroll = () => {
      const scrollTop = mainEl.scrollTop;
      const scrollHeight = mainEl.scrollHeight;
      const clientHeight = mainEl.clientHeight;

      if (
        scrollHeight - scrollTop - clientHeight < 200 &&
        !loadingRef.current && // ← check ref
        hasMoreRef.current // ← check ref
      ) {
        loadingRef.current = true; // ← block HERE instantly!
        pageRef.current += 1; // ← increment ref instantly!
        setPage(pageRef.current); // ← then update state
      }
    };

    mainEl.addEventListener("scroll", handleScroll);
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const posts = async () => {
      setLoading(true);
      try {
        const response = await getPosts(page, 5);
        if (!response.data || response.data.length === 0) {
          hasMoreRef.current = false; // ← update ref
          setHasMore(false);
        } else {
          setPostItem((prev) => {
            const uniqueNewPosts = response.data.filter(
              (newPost: any) =>
                !prev.some((oldPost) => oldPost._id === newPost._id),
            );
            return [...prev, ...uniqueNewPosts];
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        loadingRef.current = false; // ← unblock after fetch done
        setLoading(false);
      }
    };
    posts();
  }, [page]);

  return (
    <div className="flex flex-col gap-4">
      {postItem.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {loading && (
        <div className="text-center py-4 text-gray-500">Loading...</div>
      )}
      {!hasMore && (
        <div className="text-center py-4 text-gray-400">No more posts!</div>
      )}
    </div>
  );
}
