"use client";

import { useEffect, useRef } from "react";

/* ─── Skill icon cards ─── */
const SKILLS = [
  // Backend
  { name: "C# / .NET", color: "#a78bfa", bg: "bg-violet-500/10", border: "border-violet-500/30", icon: "C#" },
  { name: "Java", color: "#f97316", bg: "bg-orange-500/10", border: "border-orange-500/30", icon: "Java" },
  { name: "Python", color: "#facc15", bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: "Py" },
  { name: "REST & GraphQL", color: "#e879f9", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30", icon: "API" },
  // Frontend
  { name: "React / Next.js", color: "#22d3ee", bg: "bg-cyan-500/10", border: "border-cyan-500/30", icon: "Re" },
  { name: "Angular", color: "#ef4444", bg: "bg-red-500/10", border: "border-red-500/30", icon: "Ng" },
  { name: "TypeScript", color: "#3b82f6", bg: "bg-blue-500/10", border: "border-blue-500/30", icon: "TS" },
  { name: "Tailwind CSS", color: "#06b6d4", bg: "bg-cyan-400/10", border: "border-cyan-400/30", icon: "TW" },
  // Cloud
  { name: "Microsoft Azure", color: "#60a5fa", bg: "bg-blue-400/10", border: "border-blue-400/30", icon: "Az" },
  { name: "AWS", color: "#fb923c", bg: "bg-orange-400/10", border: "border-orange-400/30", icon: "AWS" },
  { name: "Serverless", color: "#818cf8", bg: "bg-indigo-500/10", border: "border-indigo-500/30", icon: "λ" },
  { name: "CI/CD Pipelines", color: "#34d399", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: "CI" },
  // DevOps
  { name: "Docker", color: "#38bdf8", bg: "bg-sky-500/10", border: "border-sky-500/30", icon: "Do" },
  { name: "Kubernetes", color: "#6366f1", bg: "bg-indigo-400/10", border: "border-indigo-400/30", icon: "K8s" },
  { name: "Terraform / IaC", color: "#a78bfa", bg: "bg-purple-500/10", border: "border-purple-500/30", icon: "TF" },
  { name: "GitHub Actions", color: "#f1f5f9", bg: "bg-slate-400/10", border: "border-slate-400/30", icon: "GH" },
];

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "10+", label: "Technologies" },
  { value: "🇬🇧", label: "Birmingham, UK" },
];

/* Simple SVG icon for each skill that renders a stylised letter badge */
function SkillIcon({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-xs font-bold font-mono shrink-0"
      style={{ color, background: `${color}18`, border: `1px solid ${color}40` }}
    >
      {label}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading */}
        <div className="reveal text-center space-y-2">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
            Turning ideas into{" "}
            <span className="gradient-text">scalable solutions</span>
          </h2>
        </div>

        {/* Stats */}
        <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center"
            >
              <span className="text-3xl font-extrabold gradient-text">
                {s.value}
              </span>
              <span className="text-xs text-slate-400 mt-1">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="reveal max-w-3xl mx-auto text-slate-400 text-base leading-relaxed text-center">
          I&apos;m Abdullahi Suraj, a full-stack software developer based in Birmingham, England, UK with a strong
          background in designing and delivering enterprise-grade applications.
          My experience spans cloud-native microservices, scalable backend
          systems, and modern frontend frameworks. I enjoy working in agile
          teams, championing clean code and continuous improvement.
        </div>

        {/* Skills grid */}
        <div className="reveal space-y-6">
          <p className="text-center text-slate-500 text-sm font-medium uppercase tracking-widest">
            Technologies &amp; Tools
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {SKILLS.map((skill, i) => (
              <div
                key={skill.name}
                className={`flex items-center gap-3 p-3 rounded-xl border ${skill.bg} ${skill.border} hover:scale-[1.03] transition-transform duration-200`}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <SkillIcon label={skill.icon} color={skill.color} />
                <span className="text-sm text-slate-300 font-medium leading-tight">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
