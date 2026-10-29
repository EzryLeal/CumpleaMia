import { cn } from "@/lib/utils"

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("relative z-10 mx-auto w-full max-w-4xl scroll-mt-8 px-5 py-14", className)}>
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h2 className="font-display text-4xl font-bold text-balance text-foreground md:text-5xl">{title}</h2>
        {subtitle ? <p className="text-lg leading-relaxed text-pretty text-muted-foreground">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  )
}
