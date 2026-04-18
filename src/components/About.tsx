"use client";

import { useEffect, useRef } from "react";

const SKILL_CATEGORIES = [
  {
    title: "Backend",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    skills: [
      { name: "C# / .NET", level: 90 },
      { name: "Java / Spring Boot", level: 85 },
      { name: "Python / FastAPI", level: 80 },
      { name: "REST & GraphQL APIs", level: 88 },
    ],
  },
  {
    title: "Frontend",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/30",
    skills: [
      { name: "React / Next.js", level: 87 },
      { name: "Angular", level: 82 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    title: "Cloud",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/30",
    skills: [
      { name: "Microsoft Azure", level: 85 },
      { name: "AWS", level: 80 },
      { name: "Serverless / Lambda", level: 78 },
      { name: "CI/CD Pipelines", level: 83 },
    ],
  },
  {
    title: "DevOps",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/30",
    skills: [
      { name: "Docker", level: 88 },
      { name: "Kubernetes", level: 80 },
      { name: "Terraform / IaC", level: 75 },
      { name: "GitHub Actions", level: 85 },
    ],
  },
];

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "10+", label: "Technologies" },
  { value: "UK", label: "Based in London" },
];

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
          I&apos;m a full-stack software engineer based in the UK with a strong
          background in designing and delivering enterprise-grade applications.
          My experience spans cloud-native microservices, scalable backend
          systems, and modern frontend frameworks. I enjoy working in agile
          teams, championing clean code and continuous improvement.
        </div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, ci) => (
            <div
              key={cat.title}
              className={`reveal p-5 rounded-2xl border bg-slate-800/40 ${cat.border} space-y-4`}
              style={{ transitionDelay: `${ci * 80}ms` }}
            >
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${cat.color}`}>
                {cat.title}
              </h3>
              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-700/70 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${cat.bg} border ${cat.border}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
