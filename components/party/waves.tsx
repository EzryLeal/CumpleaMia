import { cn } from "@/lib/utils"

export function Waves({ className }: { className?: string }) {
  return (
    <div className={cn("h-20 overflow-hidden", className)} aria-hidden="true">
      <svg
        className="animate-wave h-full w-[200%] fill-background"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
      >
        <path d="M0 60 Q 180 0 360 60 T 720 60 T 1080 60 T 1440 60 T 1800 60 T 2160 60 T 2520 60 T 2880 60 V120 H0 Z" />
      </svg>
    </div>
  )
}
