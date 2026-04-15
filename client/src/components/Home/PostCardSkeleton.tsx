// PostCardSkeleton.tsx
export default function PostCardSkeleton() {
  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar skeleton */}
          <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse shrink-0" />
          <div className="flex flex-col gap-1">
            {/* Name skeleton */}
            <div className="w-24 h-3 bg-slate-200 animate-pulse rounded-full" />
            {/* Time skeleton */}
            <div className="w-16 h-3 bg-slate-200 animate-pulse rounded-full" />
          </div>
        </div>
        {/* More button skeleton */}
        <div className="w-8 h-8 rounded-lg bg-slate-200 animate-pulse" />
      </div>

      {/* Title skeleton */}
      <div className="w-48 h-3 bg-slate-200 animate-pulse rounded-full mb-2" />

      {/* Content skeleton */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="w-full h-3 bg-slate-200 animate-pulse rounded-full" />
        <div className="w-full h-3 bg-slate-200 animate-pulse rounded-full" />
        <div className="w-2/3 h-3 bg-slate-200 animate-pulse rounded-full" />
      </div>

      {/* Code snippet skeleton */}
      <div className="bg-slate-200 rounded-lg p-3 mb-3">
        <div className="w-48 h-3 bg-slate-300 animate-pulse rounded-full" />
      </div>

      {/* Tags skeleton */}
      <div className="flex gap-2 mb-3 mt-3">
        <div className="w-16 h-5 bg-slate-200 animate-pulse rounded-full" />
        <div className="w-16 h-5 bg-slate-200 animate-pulse rounded-full" />
      </div>

      <div className="border-t border-slate-100 mb-3" />

      {/* Actions skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-16 h-7 bg-slate-200 animate-pulse rounded-lg" />
          <div className="w-16 h-7 bg-slate-200 animate-pulse rounded-lg" />
          <div className="w-16 h-7 bg-slate-200 animate-pulse rounded-lg" />
        </div>
        <div className="w-8 h-8 bg-slate-200 animate-pulse rounded-lg" />
      </div>
    </div>
  );
}
