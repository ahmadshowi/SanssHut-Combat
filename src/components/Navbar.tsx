"use client";

import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Categories", href: "#categories" },
  { label: "Fighters", href: "#fighters" },
  { label: "Versus", href: "#versus" },
  { label: "Schedule", href: "#schedule" },
  { label: "Venues", href: "#venues" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 shadow-card"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-glow transition-transform group-hover:scale-110">
            <Flame className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-xl font-bold uppercase tracking-wide">
            Sanss<span className="text-primary">Hut</span>{" "}
            <span className="text-gold">Combat</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm font-medium uppercase tracking-wider text-gray-300 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a href="#schedule" className="hidden lg:inline-flex">
          <span className="btn-primary px-6 py-2.5 text-sm">
            Get Tickets
          </span>
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setIsOpen((v) => !v)}
          className="lg:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-white/10"
          >
            <div className="flex flex-col gap-4 px-4 sm:px-8 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-base font-medium uppercase tracking-wider text-gray-300 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#schedule"
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-2 text-sm"
              >
                Get Tickets
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
