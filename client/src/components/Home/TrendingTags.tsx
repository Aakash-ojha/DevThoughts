import { useEffect, useState } from "react";
import { getTrendingTags } from "@/api/postApi";
import type { ITrendingTag } from "@/types/postType";

export default function TrendingTags() {
  const [tags, setTags] = useState<ITrendingTag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingTags(); // ← use existing function!
        setTags(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="border border-slate-200 rounded-xl p-4">
      <h3 className="font-semibold text-sm text-slate-800 mb-3">
        Trending Tags
      </h3>
      <div className="flex flex-col gap-2">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-2 py-1.5"
              >
                <div className="w-20 h-3 bg-slate-200 animate-pulse rounded-full" />
                <div className="w-12 h-3 bg-slate-200 animate-pulse rounded-full" />
              </div>
            ))
          : tags.map((tag) => (
              <div
                key={tag.slug}
                className="flex items-center justify-between cursor-pointer hover:bg-slate-50 px-2 py-1.5 rounded-lg transition-all"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span className="text-sm font-medium text-violet-600">
                    #{tag.name}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {tag.count} posts
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}
