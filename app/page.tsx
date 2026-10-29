import { Checklist } from "@/components/party/checklist"
import { Countdown } from "@/components/party/countdown"
import { EventDetails } from "@/components/party/event-details"
import { Footer } from "@/components/party/footer"
import { Gallery } from "@/components/party/gallery"
import { Hero } from "@/components/party/hero"
import { MenuSection } from "@/components/party/menu-section"
import { RsvpInvitation } from "@/components/party/rsvp-invitation"
import { TicketsInfo } from "@/components/party/tickets-info"

export default function Page() {
  return (
    <>
      <Hero />
      <main className="relative z-10">
        <Countdown />
        <EventDetails />
        <Gallery />
        <TicketsInfo />
        <MenuSection />
        <Checklist />
        <RsvpInvitation />
      </main>
      <Footer />
    </>
  )
}
