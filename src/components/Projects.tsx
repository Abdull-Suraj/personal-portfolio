"use client";

import { useEffect, useRef } from "react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  accent: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    title: "CloudOps Dashboard",
    description:
      "A real-time infrastructure monitoring dashboard that aggregates metrics from Azure Kubernetes clusters, App Services, and Log Analytics. Supports multi-tenant views, alerting rules, and cost reporting.",
    tags: ["React", "TypeScript", ".NET 8", "Azure", "Kubernetes", "SignalR"],
    accent: "from-cyan-500/20 to-blue-500/10",
    highlights: ["Real-time WebSocket streaming", "Multi-tenant RBAC", "Azure Cost Management API"],
  },
  {
    title: "MicroCommerce",
    description:
      "Event-driven e-commerce platform built with a microservices architecture. Separate services for catalogue, orders, payments, and notifications, orchestrated on AWS EKS with a service mesh.",
    tags: ["Java", "Spring Boot", "AWS EKS", "Docker", "Kafka", "PostgreSQL"],
    accent: "from-orange-500/20 to-red-500/10",
    highlights: ["Event-sourcing with Kafka", "Saga pattern for distributed txns", "Helm chart deployments"],
  },
  {
    title: "DataFlow Pipeline",
    description:
      "Serverless ingestion pipeline that processes millions of IoT sensor events per day. Data is transformed, enriched, and landed in a data lake for BI dashboards.",
    tags: ["Python", "AWS Lambda", "Kinesis", "S3", "Glue", "Airflow"],
    accent: "from-yellow-500/20 to-amber-500/10",
    highlights: ["3M+ events/day throughput", "Automated schema evolution", "Cost-optimised Lambda layers"],
  },
  {
    title: "DevTrack",
    description:
      "Internal developer productivity platform integrated with Azure DevOps. Provides sprint metrics, DORA stats, PR cycle-time analysis, and Slack notifications for engineering teams.",
    tags: ["Angular", "C# .NET", "Azure DevOps API", "SQL Server", "Docker"],
    accent: "from-indigo-500/20 to-purple-500/10",
    highlights: ["DORA metrics dashboard", "Automated sprint reports", "Azure AD SSO"],
  },
  {
    title: "SmartInventory",
    description:
      "Stock management system for a UK retail chain with barcode scanning, demand forecasting, and automated purchase-order generation. Deployed as a containerised SaaS solution.",
    tags: ["React", "Python", "FastAPI", "PostgreSQL", "Docker", "Redis"],
    accent: "from-green-500/20 to-teal-500/10",
    highlights: ["ML-based demand forecasting", "Real-time barcode scanning", "RESTful & OpenAPI 3.0"],
  },
  {
    title: "AuthGuard",
    description:
      "High-availability authentication microservice supporting OAuth 2.0, OIDC, and API-key flows. Provides token introspection, rate-limiting, and anomaly detection for client applications.",
    tags: ["C# .NET", "Docker", "JWT", "Redis", "Kubernetes", "Azure"],
    accent: "from-rose-500/20 to-pink-500/10",
    highlights: ["OAuth 2.0 / OIDC compliant", "Redis token caching (<5 ms)", "Deployed to AKS with HPA"],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Heading */}
        <div className="reveal text-center space-y-2">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
            Things I&apos;ve{" "}
            <span className="gradient-text">built & shipped</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            A selection of production-grade projects spanning backend services,
            cloud infrastructure, and modern frontends.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className={`reveal group relative flex flex-col rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden
                hover:border-slate-600/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Accent gradient strip */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent} opacity-80`} />

              <div className="flex flex-col flex-1 p-6 space-y-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="mt-0.5 text-cyan-500 shrink-0">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700/70 text-slate-300 border border-slate-600/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-2 border-t border-slate-700/50">
                  <a
                    href="#"
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Code
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                    aria-label={`View ${project.title} live demo`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
