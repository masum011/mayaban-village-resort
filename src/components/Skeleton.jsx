export function Skeleton({ className = '', dark = false }) {
  return (
    <div
      aria-hidden="true"
      className={`${dark ? 'skeleton-shimmer-dark' : 'skeleton-shimmer'} rounded-xl ${className}`}
    />
  );
}

export function RoomCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-[#FAF7F0] rounded-2xl overflow-hidden border border-[#1F3D2B]/10 shadow-soft"
    >
      <Skeleton className="w-full aspect-[4/3] rounded-none" />
      <div className="p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-7 w-2/3" />
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
        </div>
        <div className="pt-4 border-t border-[#1F3D2B]/10 flex items-center justify-between">
          <Skeleton className="h-3.5 w-36" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="min-h-screen bg-[#F6F1E7] pt-28 lg:pt-36 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-4">
          <Skeleton className="h-3.5 w-40" />
          <Skeleton className="h-12 sm:h-14 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <Skeleton className="w-full aspect-[16/9] max-h-[420px] rounded-2xl" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
          <RoomCardSkeleton />
          <RoomCardSkeleton />
          <RoomCardSkeleton />
        </div>
      </div>
      <span className="sr-only">Loading Mayaban Village Resort...</span>
    </div>
  );
}
