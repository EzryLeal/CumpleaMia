"use client"

import { useEffect, useState } from "react"
import { PARTY } from "@/lib/party"
import { Section } from "./section"

const TARGET = new Date(PARTY.dateISO).getTime()

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    días: Math.floor(diff / 86_400_000),
    horas: Math.floor((diff / 3_600_000) % 24),
    minutos: Math.floor((diff / 60_000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  }
}

export function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null)

  useEffect(() => {
    setRemaining(getRemaining())
    const id = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = ["días", "horas", "minutos", "segundos"] as const

  return (
    <Section id="cuenta-regresiva" title="¡Ya falta poquito!" subtitle="Cuenta regresiva para el gran chapuzón">
      {remaining?.done ? (
        <p className="text-center font-display text-3xl font-bold text-primary">
          ¡Hoy es el gran día!
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" role="timer" aria-live="off">
          {units.map((unit) => (
            <div
              key={unit}
              className="flex flex-col items-center gap-1 rounded-3xl border-2 border-card bg-accent/50 px-4 py-6 shadow-sm"
            >
              <span className="font-display text-5xl font-bold tabular-nums text-foreground md:text-6xl">
                {remaining ? String(remaining[unit]).padStart(2, "0") : "--"}
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {unit}
              </span>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
