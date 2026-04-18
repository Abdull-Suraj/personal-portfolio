"use client";

import { useEffect, useRef, useState } from "react";

interface Line {
  type: "command" | "output" | "blank";
  text: string;
}

const TERMINAL_SCRIPT: Line[] = [
  { type: "command", text: "whoami" },
  { type: "output", text: "alex.johnson" },
  { type: "blank", text: "" },
  { type: "command", text: "cat profile.txt" },
  { type: "output", text: "Software Engineer  |  3 yrs UK experience" },
  { type: "output", text: "London, United Kingdom  🇬🇧" },
  { type: "blank", text: "" },
  { type: "command", text: "cat skills.txt" },
  { type: "output", text: "Backend   » C# .NET  |  Java  |  Python" },
  { type: "output", text: "Frontend  » React   |  Angular" },
  { type: "output", text: "Cloud     » Azure   |  AWS" },
  { type: "output", text: "DevOps    » Docker  |  Kubernetes" },
  { type: "blank", text: "" },
  { type: "command", text: 'echo "Open to new opportunities 🚀"' },
  { type: "output", text: "Open to new opportunities 🚀" },
];

const CHAR_DELAY = 35;
const LINE_GAP = 220;

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let lineIndex = 0;

    function typeNextLine() {
      if (cancelled || lineIndex >= TERMINAL_SCRIPT.length) {
        setIsTyping(false);
        return;
      }

      const line = TERMINAL_SCRIPT[lineIndex];

      if (line.type !== "command") {
        // Output / blank lines appear instantly
        setTimeout(() => {
          if (cancelled) return;
          setVisibleLines((prev) => [...prev, line]);
          lineIndex++;
          typeNextLine();
        }, line.type === "blank" ? 60 : LINE_GAP / 2);
        return;
      }

      // Type out command character by character
      setIsTyping(true);
      let charIndex = 0;
      setTypingText("");

      function typeChar() {
        if (cancelled) return;
        if (charIndex <= line.text.length) {
          setTypingText(line.text.slice(0, charIndex));
          charIndex++;
          setTimeout(typeChar, CHAR_DELAY);
        } else {
          // Done typing this command — commit it, move on
          setTypingText("");
          setVisibleLines((prev) => [...prev, line]);
          lineIndex++;
          setTimeout(typeNextLine, LINE_GAP);
        }
      }
      typeChar();
    }

    const startTimer = setTimeout(typeNextLine, 600);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, []);

  // Auto-scroll terminal body
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleLines, typingText]);

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0 rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-black/60 bg-[#0d1117] font-mono text-sm">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-slate-700/50">
        <span className="w-3 h-3 rounded-full bg-red-500/90" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/90" />
        <span className="w-3 h-3 rounded-full bg-green-500/90" />
        <span className="ml-3 text-xs text-slate-500 select-none">
          bash — alex@portfolio
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 min-h-[280px] max-h-[340px] overflow-y-auto space-y-0.5 leading-relaxed">
        {visibleLines.map((line, i) => {
          if (line.type === "blank") return <div key={i} className="h-1" />;
          if (line.type === "command") {
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-400 shrink-0">❯</span>
                <span className="text-slate-100">{line.text}</span>
              </div>
            );
          }
          return (
            <div key={i} className="pl-5 text-cyan-300/90">
              {line.text}
            </div>
          );
        })}

        {/* Currently typing line */}
        {isTyping && (
          <div className="flex items-start gap-2">
            <span className="text-green-400 shrink-0">❯</span>
            <span className="text-slate-100">
              {typingText}
              <span aria-hidden="true" className="cursor-blink inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle" />
            </span>
          </div>
        )}

        {/* Idle cursor after all lines done */}
        {!isTyping && visibleLines.length === TERMINAL_SCRIPT.length && (
          <div className="flex items-start gap-2">
            <span className="text-green-400 shrink-0">❯</span>
            <span aria-hidden="true" className="cursor-blink inline-block w-2 h-4 bg-cyan-400 align-middle" />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
