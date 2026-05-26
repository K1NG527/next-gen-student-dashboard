import { BentoGrid, BentoGridItem } from "@/components/BentoGrid"

export default function Loading() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8 w-full max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="h-8 w-48 bg-white/5 rounded-md animate-pulse mb-2" />
          <div className="h-4 w-32 bg-white/5 rounded-md animate-pulse" />
        </div>
        <div className="h-10 w-24 bg-white/5 rounded-full animate-pulse" />
      </div>

      <BentoGrid>
        {/* Hero Skeleton */}
        <BentoGridItem className="md:col-span-2 h-[320px] bg-white/5 animate-pulse border-white/5" />
        
        {/* Activity Skeleton */}
        <BentoGridItem className="h-[320px] bg-white/5 animate-pulse border-white/5" />

        {/* Course Card Skeletons */}
        {[1, 2, 3, 4].map((i) => (
          <BentoGridItem key={i} className="h-[240px] bg-white/5 animate-pulse border-white/5" />
        ))}
      </BentoGrid>
    </div>
  )
}
