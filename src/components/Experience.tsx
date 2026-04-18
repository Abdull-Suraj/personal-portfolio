"use client";

import { useEffect, useRef } from "react";

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  tags: string[];
  current?: boolean;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Liaison Group",
    role: "Software Developer",
    location: "Birmingham, England, UK",
    period: "2023 – Present",
    type: "Full-time",
    current: true,
    description: [
      "Designed and developed scalable full-stack applications using C# .NET and React/TypeScript.",
      "Collaborated in agile teams to deliver cloud-native solutions on Microsoft Azure.",
      "Built and maintained RESTful APIs integrated with enterprise data systems.",
      "Contributed to CI/CD pipeline improvements using GitHub Actions and Docker.",
    ],
    tags: ["C# .NET", "React", "TypeScript", "Azure", "Docker", "REST APIs"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Section divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-14">
        {/* Heading */}
        <div className="reveal text-center space-y-2">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Work History
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
            Professional{" "}
            <span className="gradient-text">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/60 via-indigo-500/40 to-transparent" />

          <div className="space-y-10">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={i}
                className="reveal relative pl-16 sm:pl-20"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Timeline node */}
                <div className="absolute left-3.5 sm:left-5 top-6 flex items-center justify-center">
                  <span className="w-5 h-5 rounded-full bg-slate-900 border-2 border-cyan-500 shadow-lg shadow-cyan-500/30 z-10" />
                  {exp.current && (
                    <span className="absolute w-8 h-8 rounded-full bg-cyan-500/20 animate-ping" />
                  )}
                </div>

                {/* Card */}
                <div className="group rounded-2xl border border-slate-700/60 bg-slate-800/40 hover:bg-slate-800/70 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden">
                  {/* Card header */}
                  <div className="px-6 pt-6 pb-4 border-b border-slate-700/40">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      {/* Company + role */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {/* Company logo placeholder */}
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-bold shrink-0">
                            {exp.company.charAt(0)}
                          </span>
                          <div>
                            <h3 className="text-slate-100 font-bold text-base sm:text-lg leading-tight">
                              {exp.role}
                            </h3>
                            <p className="text-cyan-400 font-semibold text-sm">
                              {exp.company}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Current
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded-full bg-slate-700/60 border border-slate-600/40 text-slate-300 text-xs font-medium">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    {/* Meta row */}
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-slate-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-6 py-5 space-y-5">
                    {/* Responsibilities */}
                    <ul className="space-y-2">
                      {exp.description.map((point, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-slate-400 text-sm leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500/60 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-700/50 border border-slate-600/40 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
