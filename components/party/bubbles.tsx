"use client"

import { useRef, useState } from "react"

const BUBBLE_COUNT = 14

type BubbleConfig = {
  id: number
  left: number | null
  right: number | null
  size: number
  duration: number
  delay: number
}

function createBubble(id: number): BubbleConfig {
  const edge = 3 + ((Math.floor(id / 2) * 7) % 8)

  return {
    id,
    left: id % 2 === 0 ? edge : null,
    right: id % 2 === 1 ? edge : null,
    size: 24 + ((id * 13) % 21),
    duration: 14 + ((id * 7) % 9),
    delay: id < BUBBLE_COUNT ? -(2 + ((id * 7) % 8)) : 0,
  }
}

const INITIAL_BUBBLES = Array.from({ length: BUBBLE_COUNT }, (_, id) => createBubble(id))

export function Bubbles() {
  const [bubbles, setBubbles] = useState(INITIAL_BUBBLES)
  const nextBubbleId = useRef(BUBBLE_COUNT)

  const pop = (id: number) => {
    setBubbles((current) => current.filter((bubble) => bubble.id !== id))
    window.setTimeout(() => {
      const replacement = createBubble(nextBubbleId.current)
      nextBubbleId.current += 1
      setBubbles((current) => [...current, replacement])
    }, 1200)
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      role="group"
      aria-label="Burbujas interactivas"
    >
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} {...bubble} onPop={() => pop(bubble.id)} />
      ))}
    </div>
  )
}

function Bubble({
  id,
  left,
  right,
  size,
  duration,
  delay,
  onPop,
}: BubbleConfig & { onPop: () => void }) {
  const [isPopping, setIsPopping] = useState(false)

  const handlePop = () => {
    if (isPopping) return
    setIsPopping(true)
    window.setTimeout(onPop, 300)
  }

  return (
    <button
      type="button"
      className={`bubble absolute cursor-pointer rounded-full p-0 pointer-events-auto ${isPopping ? "bubble-popped" : ""}`}
      style={{
        left: left === null ? undefined : `${left}%`,
        right: right === null ? undefined : `${right}%`,
        bottom: -80,
        width: size,
        height: size,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
      aria-label={`Reventar burbuja ${id + 1}`}
      title="Toca o pulsa para reventar"
      onClick={handlePop}
    />
  )
}
