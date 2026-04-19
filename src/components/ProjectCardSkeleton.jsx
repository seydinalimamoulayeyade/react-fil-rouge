export default function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="h-48 animate-pulse bg-slate-800"></div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-slate-800"></div>
          <div className="h-4 w-full animate-pulse rounded bg-slate-800"></div>
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800"></div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-800"></div>
          <div className="flex gap-2">
            <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-800"></div>
            <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
