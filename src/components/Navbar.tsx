"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = ["home", "about", "projects", "contact"] as const;

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = "home";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`flex items-center justify-between gap-6 rounded-2xl px-5 py-3 transition-all duration-300
          ${
            scrolled
              ? "bg-slate-900/90 shadow-xl shadow-black/40 border border-slate-700/60"
              : "bg-slate-900/70 shadow-lg shadow-black/30 border border-slate-700/40"
          }
          backdrop-blur-md w-full max-w-2xl`}
      >
        {/* Logo */}
        <a
          href="#home"
          className="text-base font-bold tracking-tight text-cyan-400 shrink-0"
        >
          AJ<span className="text-indigo-400">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "text-cyan-400 bg-cyan-400/10"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                    }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors shrink-0"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="sm:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-slate-300 transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-300 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-300 transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul className="absolute top-full mt-2 w-[calc(100%-2rem)] max-w-2xl bg-slate-900/95 border border-slate-700/60 backdrop-blur-md rounded-2xl p-3 flex flex-col gap-1 shadow-xl">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
