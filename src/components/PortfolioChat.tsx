"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";

/* ─── Portfolio knowledge base ─────────────────────────────────────────── */
const KB = {
  name: "Abdullahi Suraj",
  role: "Full-Stack Software Developer",
  location: "Birmingham, England, UK",
  status: "Open to opportunities",
  summary:
    "Full-stack developer with UK-based experience building scalable cloud-native applications. Passionate about clean architecture, microservices, and DevOps best practices.",
  skills: {
    backend: ["C# .NET", "Java", "Python", "REST APIs", "GraphQL"],
    frontend: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS"],
    cloud: ["Microsoft Azure", "AWS", "Serverless", "CI/CD Pipelines"],
    devops: ["Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  experience: [
    {
      company: "Liaison Group",
      role: "Software Developer",
      period: "2023 – Present",
      location: "Birmingham, England, UK",
      type: "Full-time",
      points: [
        "Designed and developed scalable full-stack applications using C# .NET and React/TypeScript.",
        "Collaborated in agile teams to deliver cloud-native solutions on Microsoft Azure.",
        "Built and maintained RESTful APIs integrated with enterprise data systems.",
        "Contributed to CI/CD pipeline improvements using GitHub Actions and Docker.",
      ],
      tags: ["C# .NET", "React", "TypeScript", "Azure", "Docker", "REST APIs"],
    },
  ],
  projects: [
    {
      title: "CloudOps Dashboard",
      description:
        "Real-time infrastructure monitoring dashboard aggregating metrics from Azure Kubernetes clusters, App Services, and Log Analytics. Supports multi-tenant views, alerting rules, and cost reporting.",
      tags: ["React", "TypeScript", ".NET 8", "Azure", "Kubernetes", "SignalR"],
      highlights: ["Real-time WebSocket streaming", "Multi-tenant RBAC", "Azure Cost Management API"],
    },
    {
      title: "MicroCommerce",
      description:
        "Event-driven e-commerce platform built with a microservices architecture. Separate services for catalogue, orders, payments, and notifications, orchestrated on AWS EKS with a service mesh.",
      tags: ["Java", "Spring Boot", "AWS EKS", "Docker", "Kafka", "PostgreSQL"],
      highlights: ["Event-sourcing with Kafka", "Saga pattern for distributed transactions", "Helm chart deployments"],
    },
    {
      title: "DataFlow Pipeline",
      description:
        "Serverless ingestion pipeline that processes millions of IoT sensor events per day. Data is transformed, enriched, and landed in a data lake for BI dashboards.",
      tags: ["Python", "AWS Lambda", "Kinesis", "S3", "Glue", "Airflow"],
      highlights: ["3M+ events/day throughput", "Automated schema evolution", "Cost-optimised Lambda layers"],
    },
    {
      title: "DevTrack",
      description:
        "Internal developer productivity platform integrated with Azure DevOps. Provides sprint metrics, DORA stats, PR cycle-time analysis, and Slack notifications.",
      tags: ["Angular", "C# .NET", "Azure DevOps API", "SQL Server", "Docker"],
      highlights: ["DORA metrics dashboard", "Automated sprint reports", "Azure AD SSO"],
    },
    {
      title: "SmartInventory",
      description:
        "Stock management system for a UK retail chain with barcode scanning, demand forecasting, and automated purchase-order generation.",
      tags: ["React", "Python", "FastAPI", "PostgreSQL", "Docker", "Redis"],
      highlights: ["ML-based demand forecasting", "Real-time barcode scanning", "RESTful & OpenAPI 3.0"],
    },
    {
      title: "AuthGuard",
      description:
        "High-availability authentication microservice supporting OAuth 2.0, OIDC, and API-key flows with token introspection and anomaly detection.",
      tags: ["C# .NET", "Docker", "JWT", "Redis", "Kubernetes", "Azure"],
      highlights: ["OAuth 2.0 / OIDC compliant", "Redis token caching (<5 ms)", "Deployed to AKS with HPA"],
    },
  ],
  contact: {
    method: "Use the contact form in the Contact section of the portfolio.",
    location: "Birmingham, England, UK",
  },
  stats: {
    years: "3+",
    projects: "20+",
    technologies: "10+",
  },
};

/* ─── Response engine ───────────────────────────────────────────────────── */
function getResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|howdy|what'?s up|yo)\b/.test(q)) {
    return `Hey there! 👋 I'm Abdullahi's portfolio assistant. Ask me anything about his skills, experience, projects, or background — I'm happy to help!`;
  }

  // Who is he / about
  if (/\b(who (is|are) (you|he|abdullahi)|about (you|him|abdullahi)|tell me about|introduce)\b/.test(q)) {
    return `**${KB.name}** is a ${KB.role} based in ${KB.location}.\n\n${KB.summary}\n\nHe has **${KB.stats.years} years** of experience, has delivered **${KB.stats.projects} projects**, and works across **${KB.stats.technologies} technologies**. He is currently **${KB.status}**.`;
  }

  // Skills
  if (/\b(skill|tech|stack|language|framework|tool|know|use|work with|expertise|proficient)\b/.test(q)) {
    if (/\b(backend|server|api|database)\b/.test(q)) {
      return `Abdullahi's **backend skills** include:\n• ${KB.skills.backend.join("\n• ")}`;
    }
    if (/\b(frontend|ui|interface|client|web)\b/.test(q)) {
      return `Abdullahi's **frontend skills** include:\n• ${KB.skills.frontend.join("\n• ")}`;
    }
    if (/\b(cloud|azure|aws|serverless)\b/.test(q)) {
      return `Abdullahi's **cloud skills** include:\n• ${KB.skills.cloud.join("\n• ")}`;
    }
    if (/\b(devops|docker|kubernetes|ci.?cd|pipeline|terraform)\b/.test(q)) {
      return `Abdullahi's **DevOps skills** include:\n• ${KB.skills.devops.join("\n• ")}`;
    }
    return `Abdullahi is skilled across the full stack:\n\n**Backend:** ${KB.skills.backend.join(", ")}\n\n**Frontend:** ${KB.skills.frontend.join(", ")}\n\n**Cloud:** ${KB.skills.cloud.join(", ")}\n\n**DevOps:** ${KB.skills.devops.join(", ")}`;
  }

  // Experience / work history
  if (/\b(experience|work|job|employ|company|career|history|current|where (does|do|did) (he|you) work)\b/.test(q)) {
    const exp = KB.experience[0];
    return `Abdullahi currently works at **${exp.company}** as a **${exp.role}** (${exp.period}, ${exp.location}).\n\nKey responsibilities:\n• ${exp.points.join("\n• ")}\n\nTech used: ${exp.tags.join(", ")}.`;
  }

  // Projects — specific
  const projectMatch = KB.projects.find((p) =>
    q.includes(p.title.toLowerCase())
  );
  if (projectMatch) {
    return `**${projectMatch.title}**\n\n${projectMatch.description}\n\nHighlights:\n• ${projectMatch.highlights.join("\n• ")}\n\nTech: ${projectMatch.tags.join(", ")}.`;
  }

  // Projects — general
  if (/\b(project|built|made|ship|product|portfolio|work(s)?)\b/.test(q)) {
    const list = KB.projects
      .map((p, i) => `${i + 1}. **${p.title}** — ${p.tags.slice(0, 3).join(", ")}`)
      .join("\n");
    return `Abdullahi has built **${KB.stats.projects} projects**. Here are some highlights:\n\n${list}\n\nAsk me about any specific project for more details!`;
  }

  // Location
  if (/\b(where|location|city|country|base|live|based)\b/.test(q)) {
    return `Abdullahi is based in **${KB.location}**. He is open to both local and remote opportunities.`;
  }

  // Availability / hiring
  if (/\b(available|hire|recruit|opportunit|open to|looking for|job)\b/.test(q)) {
    return `Yes! Abdullahi is currently **${KB.status}**. Feel free to reach him through the **Contact** section of this portfolio.`;
  }

  // Contact
  if (/\b(contact|reach|email|message|get in touch)\b/.test(q)) {
    return `You can reach Abdullahi via the **Contact** section at the bottom of this page. He's always happy to connect about new opportunities or collaborations!`;
  }

  // Education
  if (/\b(education|degree|university|college|study|studied|qualif)\b/.test(q)) {
    return `Abdullahi's educational background is not listed on the portfolio, but his hands-on industry experience speaks for itself — **${KB.stats.years} years** building production-grade software across multiple domains.`;
  }

  // Stats / numbers
  if (/\b(how many|stats|number|count|years|experience)\b/.test(q)) {
    return `Here's a quick snapshot:\n\n• **${KB.stats.years} years** of professional experience\n• **${KB.stats.projects} projects** delivered\n• **${KB.stats.technologies} technologies** mastered\n• Based in **${KB.location}**`;
  }

  // Azure / cloud specific
  if (/\b(azure|aws|cloud|kubernetes|k8s|docker|devops)\b/.test(q)) {
    return `Abdullahi has strong cloud & DevOps expertise:\n\n**Microsoft Azure** — App Services, AKS, Log Analytics, Cost Management\n**AWS** — EKS, Lambda, Kinesis, S3, Glue\n**DevOps** — Docker, Kubernetes, Terraform, GitHub Actions, CI/CD pipelines`;
  }

  // .NET / C# / Java / Python
  if (/\b(\.net|dotnet|c#|csharp)\b/.test(q)) {
    return `C# / .NET is one of Abdullahi's primary backend languages. He uses it at **Liaison Group** to build scalable APIs and services, and it features in projects like **CloudOps Dashboard**, **DevTrack**, and **AuthGuard**.`;
  }
  if (/\bjava\b/.test(q)) {
    return `Abdullahi is proficient in **Java**, notably using Spring Boot for the **MicroCommerce** event-driven e-commerce platform deployed on AWS EKS.`;
  }
  if (/\bpython\b/.test(q)) {
    return `Abdullahi uses **Python** for data engineering and serverless workloads. He built the **DataFlow Pipeline** (processing 3M+ IoT events/day) and **SmartInventory** (FastAPI + ML demand forecasting) with Python.`;
  }
  if (/\b(react|next\.?js|nextjs)\b/.test(q)) {
    return `Abdullahi builds modern UIs with **React / Next.js** (including this portfolio!). He uses React at Liaison Group and in projects like **CloudOps Dashboard** and **SmartInventory**.`;
  }
  if (/\bangular\b/.test(q)) {
    return `Abdullahi is experienced with **Angular**, having used it for the **DevTrack** developer productivity platform.`;
  }

  // Thanks / bye
  if (/\b(thank|thanks|thx|bye|goodbye|ciao|cheers)\b/.test(q)) {
    return `You're welcome! 😊 Feel free to ask anything else. And if you'd like to connect, head over to the Contact section!`;
  }

  // Default
  return `I'm not sure about that specific question, but I can tell you about Abdullahi's **skills**, **experience**, **projects**, **location**, or **contact** details. Try asking something like:\n\n• "What are his skills?"\n• "Tell me about his projects"\n• "Where does he work?"\n• "How can I contact him?"`;
}

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

/* ─── Markdown-lite renderer ────────────────────────────────────────────── */
function renderText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className="text-slate-100 font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
    return (
      <span key={i}>
        {parts}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi! 👋 I'm Abdullahi's AI assistant. Ask me anything about his skills, experience, projects, or background!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: nextId.current++, role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate slight delay for a natural feel
    setTimeout(() => {
      const reply = getResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "assistant", text: reply },
      ]);
      setTyping(false);
    }, 600);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,420px)] flex flex-col rounded-2xl border border-slate-700/60 bg-[#0d1320]/95 shadow-2xl shadow-black/60 backdrop-blur-md overflow-hidden"
          style={{ maxHeight: "min(70vh, 520px)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-800/60 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
              </span>
              <span className="text-sm font-semibold text-slate-100">Ask Abdullahi&apos;s AI</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-700/60"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-cyan-500/20 border border-cyan-500/30 text-slate-200 rounded-tr-sm"
                      : "bg-slate-800/70 border border-slate-700/50 text-slate-300 rounded-tl-sm"
                  }`}
                >
                  {renderText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                  </svg>
                </div>
                <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
            {["Skills", "Projects", "Experience", "Contact"].map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-slate-700/60 border border-slate-600/40 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 border-t border-slate-700/50 bg-slate-800/40 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              className="flex-1 bg-slate-700/50 border border-slate-600/40 rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 transition-colors shrink-0"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating island trigger */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setOpen((v) => !v)}
          className={`group flex items-center gap-3 px-5 py-3 rounded-full border shadow-2xl shadow-black/60 backdrop-blur-md transition-all duration-300 ${
            open
              ? "bg-slate-800/90 border-slate-600/60 text-slate-300 hover:border-slate-500/60"
              : "bg-[#0d1320]/90 border-cyan-500/40 text-slate-200 hover:border-cyan-400/70 hover:shadow-cyan-500/10"
          }`}
          aria-label={open ? "Close AI chat" : "Open AI chat"}
          aria-expanded={open}
        >
          {open ? (
            <>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-sm font-medium">Close</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-sm font-medium">Ask me about Abdullahi</span>
              <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </>
  );
}
