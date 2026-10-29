"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { CHECKLIST } from "@/lib/party"
import { Section } from "./section"

export function Checklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const allDone = checked.size === CHECKLIST.length

  const toggle = (item: string) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(item)) next.delete(item)
      else next.add(item)
      return next
    })

  return (
    <Section
      id="checklist"
      title="Checklist para papás"
      subtitle="¿Qué meter en la mochila? Toca cada elemento para asegurarte de no olvidar nada:"
    >
      <div className="rounded-3xl bg-card p-6 shadow-sm md:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted" aria-hidden="true">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${(checked.size / CHECKLIST.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold tabular-nums" aria-live="polite">
            {checked.size}/{CHECKLIST.length}
          </span>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {CHECKLIST.map((item) => {
            const isChecked = checked.has(item)
            return (
              <li key={item}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={isChecked}
                  onClick={() => toggle(item)}
                  className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left font-semibold transition-all active:scale-95 ${
                    isChecked ? "border-primary bg-secondary" : "border-border bg-background hover:border-accent"
                  }`}
                >
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isChecked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"
                    }`}
                    aria-hidden="true"
                  >
                    {isChecked ? <Check className="size-4" strokeWidth={3} /> : null}
                  </span>
                  <span className={isChecked ? "line-through opacity-70" : ""}>{item}</span>
                </button>
              </li>
            )
          })}
        </ul>

        {allDone ? (
          <p className="animate-pop-in mt-6 text-center font-display text-2xl font-semibold text-primary">
            ¡Mochila lista! Nos vemos en el agua
          </p>
        ) : null}
      </div>
    </Section>
  )
}
