import { CalendarHeart, Clock, MapPin, Navigation } from "lucide-react"
import { PARTY } from "@/lib/party"
import { Section } from "./section"

export function EventDetails() {
  return (
    <Section id="detalles" title="Fecha, hora y lugar" subtitle="Guarda la fecha en tu calendario">
      <div className="grid gap-4 md:grid-cols-3">
        <DetailCard icon={<CalendarHeart className="size-6" />} label="Fecha" value={PARTY.dateLabel} />
        <DetailCard icon={<Clock className="size-6" />} label="Hora" value={PARTY.timeLabel} />
        <DetailCard
          icon={<MapPin className="size-6" />}
          label="Lugar"
          value={`${PARTY.placeName}, ${PARTY.placeCity}`}
        />
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 rounded-3xl bg-card p-6 text-center shadow-sm md:p-8">
        <p className="font-display text-2xl font-semibold">¿Cómo llegar?</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={PARTY.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <MapPin className="size-5" aria-hidden="true" />
            Abrir en Google Maps
          </a>
          <a
            href={PARTY.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-bold text-accent-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <Navigation className="size-5" aria-hidden="true" />
            Abrir en Waze
          </a>
        </div>
      </div>
    </Section>
  )
}

function DetailCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl bg-card p-6 text-center shadow-sm transition-transform hover:-translate-y-1">
      <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary" aria-hidden="true">
        {icon}
      </span>
      <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-display text-xl font-semibold text-balance">{value}</p>
    </div>
  )
}
