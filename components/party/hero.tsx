import { PARTY } from "@/lib/party"
import { Bubbles } from "./bubbles"
import { Waves } from "./waves"

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-accent/40">
      <Bubbles />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pb-32 pt-20 text-center md:pt-28">
        <p className="rounded-full bg-card/80 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-primary">
          Fiesta acuática de {PARTY.birthdayName}
        </p>

        <div className="animate-float-soft relative flex size-40 items-center justify-center rounded-full border-4 border-card bg-primary shadow-xl shadow-primary/30 md:size-48">
          <span className="font-display text-8xl font-bold text-primary-foreground md:text-9xl">
            {PARTY.age}
          </span>
        </div>

        <h1 className="font-display text-5xl font-bold text-balance text-foreground md:text-7xl">
          ¡Mis {PARTY.age} Años!
        </h1>
        <p className="font-display text-2xl font-medium text-primary md:text-3xl">
          ¡Acompáñame a festejar en el agua!
        </p>
        <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
          Prepárate para un día lleno de toboganes, chapuzones, juegos, pastel y muchísima diversión
          bajo el sol.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#confirmar"
            className="rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
          >
            Confirmar asistencia
          </a>
          <a
            href="#detalles"
            className="rounded-full border-2 border-foreground/15 bg-card px-7 py-3.5 font-bold text-foreground transition-transform hover:scale-105 active:scale-95"
          >
            Ver detalles
          </a>
        </div>
        <p className="text-sm text-muted-foreground">Toca las burbujas para reventarlas</p>
      </div>
      <Waves className="absolute inset-x-0 bottom-0" />
    </header>
  )
}
