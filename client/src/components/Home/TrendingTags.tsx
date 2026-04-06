const tags = [
  { name: "#react", posts: "1.2k" },
  { name: "#rust", posts: "843" },
  { name: "#typescript", posts: "721" },
  { name: "#ai", posts: "612" },
  { name: "#nextjs", posts: "534" },
  { name: "#python", posts: "489" },
];

export default function TrendingTags() {
  return (
    <div className="border border-slate-200 rounded-xl p-4">
      <h3 className="font-semibold text-sm text-slate-800 mb-3">
        Trending Tags
      </h3>
      <div className="flex flex-col gap-2">
        {tags.map((tag) => (
          <div
            key={tag.name}
            className="flex items-center justify-between cursor-pointer hover:bg-slate-50 px-2 py-1.5 rounded-lg transition-all"
          >
            <span className="text-sm font-medium text-violet-600">
              {tag.name}
            </span>
            <span className="text-xs text-slate-400">{tag.posts} posts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
