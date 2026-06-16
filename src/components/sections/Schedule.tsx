import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import EventCard from "@/components/ui/EventCard";
import { events } from "@/data/events";

export default function Schedule() {
  return (
    <section id="schedule" className="section-padding relative">
      <SectionHeading
        label="Calendar"
        title="Upcoming Schedule"
        description="Don't miss the biggest combat sports events happening around the globe."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, idx) => (
          <FadeIn key={event.id} delay={idx * 0.08}>
            <EventCard event={event} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
