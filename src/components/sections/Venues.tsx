import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import VenueCard from "@/components/ui/VenueCard";
import { venues } from "@/data/venues";

export default function Venues() {
  return (
    <section id="venues" className="section-padding relative">
      <div className="absolute right-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />

      <SectionHeading
        label="Locations"
        title="Venue Directory"
        description="Iconic arenas and stadiums that have hosted the world's greatest combat sports moments."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue, idx) => (
          <FadeIn key={venue.id} delay={idx * 0.08}>
            <VenueCard venue={venue} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
