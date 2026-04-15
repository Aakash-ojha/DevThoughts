import { getPosts } from "@/api/postApi.js";
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function PostFeed() {
  const { selectedTag } = useOutletContext<{ selectedTag: string | null }>();

  const [postItem, setPostItem] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const pageRef = useRef(1);

  const fetchPosts = async (reset = false) => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const currentPage = reset ? 1 : pageRef.current;
      const response = await getPosts(currentPage, 5, selectedTag ?? undefined);

      if (!response.data || response.data.length === 0) {
        hasMoreRef.current = false;
        setHasMore(false);
      } else {
        setPostItem((prev) => {
          if (reset) return response.data; // ← on reset just replace
          const uniqueNewPosts = response.data.filter(
            // ← on scroll, filter duplicates
            (newPost: any) =>
              !prev.some((oldPost) => oldPost._id === newPost._id),
          );
          return [...prev, ...uniqueNewPosts];
        });
        pageRef.current = currentPage + 1;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // reset when tag changes
  useEffect(() => {
    hasMoreRef.current = true;
    pageRef.current = 1;
    loadingRef.current = false;
    setHasMore(true);
    setPostItem([]);

    const timer = setTimeout(() => {
      fetchPosts(true); // ← only runs once because clearTimeout cancels first run!
    }, 0);

    return () => clearTimeout(timer); // ← React dev mode: cancels first run!
  }, [selectedTag]);

  // scroll listener
  useEffect(() => {
    const mainEl = document.querySelector("main") as HTMLElement;
    mainEl.scrollTo({ top: 0, behavior: "instant" });

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = mainEl;
      if (scrollHeight - scrollTop - clientHeight < 200) {
        fetchPosts();
      }
    };

    mainEl.addEventListener("scroll", handleScroll);
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, [selectedTag]);

  return (
    <div className="flex flex-col gap-4">
      {postItem.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {loading && (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      )}

      {!hasMore && !loading && (
        <div className="text-center py-4 text-gray-400">No more posts!</div>
      )}
    </div>
  );
}
