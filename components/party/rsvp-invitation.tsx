"use client"

import { useState } from "react"
import { ExternalLink, MessageCircle, PartyPopper } from "lucide-react"
import { PARTY } from "@/lib/party"
import { Section } from "./section"

type Guest = {
  name: string
  phone: string
  adults: number
  kids: number
  message: string
}

const initialGuest: Guest = { name: "", phone: "", adults: 1, kids: 1, message: "" }

function onlyDigits(value: string) {
  return value.replace(/\D/g, "")
}

function withCountryCode(phone: string) {
  const digits = onlyDigits(phone)
  return digits.length === 8 ? `502${digits}` : digits
}

function countLabel(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`
}

function guestInvitation(g: Guest) {
  const url =
    typeof window !== "undefined" &&
    !["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname)
      ? window.location.href.split("#")[0]
      : ""
  return [
    `¡Hola ${g.name}!`,
    "",
    `Estás invitado(a) a celebrar los ${PARTY.age} años de ${PARTY.birthdayName}.`,
    `Fecha: ${PARTY.dateLabel}`,
    `Hora: ${PARTY.timeLabel}`,
    `Lugar: ${PARTY.placeName}, ${PARTY.placeCity}`,
    `Pases solicitados: ${g.adults + g.kids} (${countLabel(g.adults, "adulto", "adultos")}, ${countLabel(g.kids, "niño", "niños")})`,
    g.message ? `Mensaje: ${g.message}` : null,
    "",
    `Ubicación: ${PARTY.googleMapsUrl}`,
    url ? `Invitación: ${url}` : null,
    "",
    "¡Te esperamos para hacer un gran Splash!",
  ]
    .filter((line) => line !== null)
    .join("\n")
}

export function RsvpInvitation() {
  const [guest, setGuest] = useState<Guest>(initialGuest)
  const [submitted, setSubmitted] = useState<Guest | null>(null)

  const update = <K extends keyof Guest>(key: K, value: Guest[K]) => setGuest((g) => ({ ...g, [key]: value }))

  const guestLink = submitted
    ? `https://wa.me/${withCountryCode(submitted.phone)}?text=${encodeURIComponent(guestInvitation(submitted))}`
    : ""

  return (
    <Section id="confirmar" title="Confirma tu asistencia" subtitle="Llena tus datos y recibe tu invitación personalizada">
      {submitted ? (
        <div className="flex flex-col items-center gap-6">
          <InvitationCard guest={submitted} />

          <div className="flex w-full max-w-md flex-col gap-3">
            <a
              href={guestLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-bold text-accent-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Enviar informacion por WhatsApp
            </a>
            <p className="text-center text-sm text-muted-foreground">
              WhatsApp abrirá el mensaje listo; toca enviar para compartirlo.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(null)}
              className="py-2 text-sm font-semibold text-muted-foreground underline underline-offset-4"
            >
              Editar mis datos
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted({ ...guest, name: guest.name.trim(), message: guest.message.trim() })
          }}
          className="mx-auto flex max-w-xl flex-col gap-5 rounded-3xl bg-card p-6 shadow-sm md:p-8"
        >
          <Field label="Nombre de la familia o invitado" htmlFor="name">
            <input
              id="name"
              required
              maxLength={80}
              value={guest.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Ej. Familia López"
              className="input-field"
            />
          </Field>
          <Field label="Tu número de WhatsApp" htmlFor="phone">
            <input
              id="phone"
              required
              type="tel"
              inputMode="tel"
              pattern="[0-9+\s\-]{8,16}"
              value={guest.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="Ej. 5555 1234"
              aria-label="Número de WhatsApp de quien recibirá la invitación"
              className="input-field"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Stepper label="Adultos" value={guest.adults} min={0} onChange={(v) => update("adults", v)} />
            <Stepper label="Niños" value={guest.kids} min={0} onChange={(v) => update("kids", v)} />
          </div>
          <Field label="Mensaje para la cumpleañera (opcional)" htmlFor="message">
            <textarea
              id="message"
              rows={3}
              maxLength={300}
              value={guest.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="¡Feliz cumple!"
              className="input-field resize-none"
            />
          </Field>
          <button
            type="submit"
            disabled={guest.adults + guest.kids === 0}
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <PartyPopper className="size-5" aria-hidden="true" />
            Crear mi invitación
          </button>
        </form>
      )}

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <p className="text-muted-foreground">¿Prefieres el formulario oficial?</p>
        <a
          href={PARTY.googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border-4 border-card bg-foreground px-8 py-4 font-display text-xl font-semibold text-background shadow-xl transition-transform hover:scale-105 active:scale-95"
        >
          Confirmar mi asistencia aquí
          <ExternalLink className="size-5" aria-hidden="true" />
        </a>
      </div>
    </Section>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-bold">
        {label}
      </label>
      {children}
    </div>
  )
}

function Stepper({
  label,
  value,
  min,
  onChange,
}: {
  label: string
  value: number
  min: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">{label}</span>
      <div className="flex items-center justify-between rounded-2xl border-2 bg-background p-1.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex size-10 items-center justify-center rounded-xl bg-card text-xl font-bold shadow-sm active:scale-90"
          aria-label={`Quitar ${label.toLowerCase()}`}
        >
          {"−"}
        </button>
        <span className="font-display text-2xl font-semibold tabular-nums" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(10, value + 1))}
          className="flex size-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground shadow-sm active:scale-90"
          aria-label={`Agregar ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

function InvitationCard({ guest }: { guest: Guest }) {
  return (
    <article className="animate-pop-in relative w-full max-w-md overflow-hidden rounded-3xl border-8 border-card bg-accent/50 p-8 text-center shadow-2xl shadow-primary/20">
      <p className="text-sm font-bold uppercase tracking-widest text-primary">Invitación especial para</p>
      <p className="mt-1 font-display text-3xl font-bold text-balance">{guest.name}</p>

      <div className="mx-auto my-6 flex size-28 items-center justify-center rounded-full border-4 border-card bg-primary shadow-lg">
        <span className="font-display text-6xl font-bold text-primary-foreground">{PARTY.age}</span>
      </div>

      <p className="font-display text-2xl font-semibold text-balance">
        ¡{PARTY.birthdayName} cumple {PARTY.age} años!
      </p>
      <dl className="mt-5 flex flex-col gap-2 rounded-2xl bg-card p-4 text-left">
        <Row term="Fecha" detail={PARTY.dateLabel} />
        <Row term="Hora" detail={PARTY.timeLabel} />
        <Row term="Lugar" detail={PARTY.placeName} />
        <Row
          term="Pases"
          detail={`${countLabel(guest.adults, "adulto", "adultos")} · ${countLabel(guest.kids, "niño", "niños")} (${guest.adults + guest.kids} total)`}
        />
      </dl>
      {guest.message ? <p className="mt-4 italic text-pretty text-muted-foreground">{`"${guest.message}"`}</p> : null}
    </article>
  )
}

function Row({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="font-bold text-muted-foreground">{term}</dt>
      <dd className="text-right font-semibold">{detail}</dd>
    </div>
  )
}
