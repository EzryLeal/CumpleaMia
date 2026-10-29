"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { PARTY, PHOTOS } from "@/lib/party"
import { Section } from "./section"

const ROTATIONS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"]

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  const move = (step: number) =>
    setActive((i) => (i === null ? i : (i + step + PHOTOS.length) % PHOTOS.length))

  return (
    <Section
      id="fotos"
      title={`Así celebramos a ${PARTY.birthdayName}`}
      subtitle="Toca una foto para verla en grande. Las imágenes son de muestra; reemplázalas por fotos de Mia antes de compartir."
    >
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(i)}
            className={`${ROTATIONS[i % ROTATIONS.length]} rounded-2xl bg-card p-2 pb-6 shadow-md transition-transform hover:rotate-0 hover:scale-105 focus-visible:rotate-0`}
          >
            <span className="relative block aspect-square overflow-hidden rounded-xl">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </span>
            <span className="sr-only">Ampliar foto</span>
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={PHOTOS[active].alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setActive(null)
            if (e.key === "ArrowRight") move(1)
            if (e.key === "ArrowLeft") move(-1)
          }}
        >
          <div className="animate-pop-in relative w-full max-w-lg rounded-3xl bg-card p-3" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src={PHOTOS[active].src} alt={PHOTOS[active].alt} fill sizes="512px" className="object-cover" />
            </div>
            <p className="px-2 pt-3 text-center font-display text-lg">{PHOTOS[active].alt}</p>
            <button
              type="button"
              autoFocus
              onClick={() => setActive(null)}
              className="absolute -right-3 -top-3 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md"
            >
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Cerrar</span>
            </button>
            <button
              type="button"
              onClick={() => move(-1)}
              className="absolute left-5 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 shadow-md"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
              <span className="sr-only">Foto anterior</span>
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="absolute right-5 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 shadow-md"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
              <span className="sr-only">Foto siguiente</span>
            </button>
          </div>
        </div>
      ) : null}
    </Section>
  )
}
