import { PARTY } from "@/lib/party"

export function Footer() {
  return (
    <footer className="relative z-10 mt-10 bg-primary px-6 py-16 text-center text-primary-foreground">
      <p className="font-display text-4xl font-bold text-balance md:text-5xl">
        ¡Te esperamos para hacer un gran Splash! 💦
      </p>
      <p className="mt-3 text-lg font-semibold opacity-90">
        {PARTY.placeName} • Escuintla, Guatemala
      </p>
    </footer>
  )
}
