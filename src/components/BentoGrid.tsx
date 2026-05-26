import { cn } from "@/lib/utils"

interface BentoGridProps {
  className?: string
  children: React.ReactNode
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <section
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </section>
  )
}

interface BentoGridItemProps {
  className?: string
  children?: React.ReactNode
}

export const BentoGridItem = ({ className, children }: BentoGridItemProps) => {
  return (
    <article
      className={cn(
        "rounded-2xl border border-white/5 bg-card/50 backdrop-blur-sm p-6 overflow-hidden flex flex-col justify-between glow-border",
        className
      )}
    >
      {children}
    </article>
  )
}
