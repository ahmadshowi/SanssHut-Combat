import {
  Flame,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Categories", href: "#categories" },
  { label: "Fighters", href: "#fighters" },
  { label: "Versus", href: "#versus" },
  { label: "Schedule", href: "#schedule" },
  { label: "Venues", href: "#venues" },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-charcoal">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-80 w-80 animate-pulse-glow rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 animate-float rounded-full bg-gold/10 blur-[100px]" />
      </div>

      <div className="section-padding !pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo + description */}
          <div>
            <a href="#hero" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-glow">
                <Flame className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-xl font-bold uppercase tracking-wide">
                Sanss<span className="text-primary">Hut</span>{" "}
                <span className="text-gold">Combat</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              The ultimate hub for combat sports fans — fighters, fight cards,
              venues, and analytics, all in one premium platform.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>contact@sansshutcombat.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>+1 (555) 010-2024</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>Las Vegas, NV, USA</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
              Follow Us
            </h4>
            <div className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-glow"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} SanssHut Combat. All rights
            reserved.
          </p>
          <p>Built for combat sports fans worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
