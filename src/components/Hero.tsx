"use client";

import dynamic from "next/dynamic";

const Terminal = dynamic(() => import("./Terminal"), { ssr: false });

const BADGES = [
  "C# .NET",
  "Java",
  "Python",
  "React",
  "Angular",
  "Azure",
  "AWS",
  "Docker",
  "Kubernetes",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — intro */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to opportunities
          </div>

          <div className="space-y-2">
            <p className="text-slate-400 text-lg font-medium">Hi, I&apos;m</p>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-none gradient-text">
              Abdullahi Suraj
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-300">
              Software Developer
            </h2>
            <p className="flex items-center gap-1.5 text-slate-400 text-sm">
              <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Birmingham, England, UK
            </p>
          </div>

          <p className="text-slate-400 text-base leading-relaxed max-w-md">
            Full-stack developer with{" "}
            <span className="text-cyan-400 font-semibold">
              UK-based experience
            </span>{" "}
            building scalable cloud-native applications. Passionate about clean
            architecture, microservices, and DevOps best practices.
          </p>

          {/* Tech badge row */}
          <div className="flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span
                key={b}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 border border-slate-700/60 text-slate-300"
              >
                {b}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-900 transition-colors shadow-lg shadow-cyan-500/20"
            >
              View Projects
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 hover:text-indigo-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl font-semibold text-sm border border-slate-600 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right — Terminal */}
        <div className="flex justify-center lg:justify-end">
          <Terminal />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 text-xs">
        <span>scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </div>
    </section>
  );
}
