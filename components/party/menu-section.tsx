import { UtensilsCrossed } from "lucide-react"
import { Section } from "./section"

export function MenuSection() {
  return (
    <Section
      id="menu"
      title="Menú del parque"
      subtitle="Por si les da hambre después de tanto nadar"
    >
      <div className="rounded-3xl bg-card p-6 text-center shadow-sm md:p-8">
        <p className="mx-auto mb-5 inline-flex items-center justify-center gap-2 rounded-full bg-accent/50 px-4 py-2 text-sm font-bold text-accent-foreground">
          <UtensilsCrossed className="size-4 shrink-0" aria-hidden="true" />
          El menú NO está incluido en la fiesta
        </p>
        <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground">
          Si deseas comprar alimentos o bebidas es adicional, y cada familia cubre su propio consumo. 
          Te comparto un poco de informacion sobre el menu que tienen en el parque, para que puedan planear tu visita y tu presupuesto.
          menú incluye, entre otros:
          * Hamburguesa de res — Q 35
          * Hamburguesa de pollo — Q 35
          * Papas fritas — Q 15
          * Hot-dog — Q 25
          * Pollo frito — Q 50
          * Churrasquito — Q 45
          El menú y los precios se pueden consultar directamente en Aqua Park Palín.
          El numero de WhatsApp del parque es +502 7821 2970
        </p>
        <p className="mt-4 font-semibold text-primary">
          Ahora bien la entrada y una pequeña refacción sí están cubiertas por nosotros, así que no se preocupen por eso.
        </p>
      </div>
    </Section>
  )
}
