import { Gift, TriangleAlert } from "lucide-react"
import { Section } from "./section"

export function TicketsInfo() {
  return (
    <Section id="entradas" title="Información importante sobre las entradas">
      <div className="flex flex-col gap-5 rounded-3xl border-4 border-card bg-secondary p-6 shadow-sm md:p-10">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:text-left">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
            <Gift className="size-7" />
          </span>
          <div className="flex flex-col gap-2">
            <p className="font-display text-2xl font-semibold text-balance">
              ¡La diversión de todos nuestros invitados va por nuestra cuenta!
            </p>
            <p className="text-lg leading-relaxed text-pretty">
              Cubriremos con mucho cariño la entrada de cada uno y una pequeña refacción. 
              Porfavor confirma con tiempo para reservarles sus pases.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl bg-card p-4">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="leading-relaxed text-pretty">
            <strong>Nota:</strong> toma en cuenta que, de cancelar luego de haber confirmado,
            significaría una pérdida que no lograríamos recuperar.
          </p>
        </div>
      </div>
    </Section>
  )
}
