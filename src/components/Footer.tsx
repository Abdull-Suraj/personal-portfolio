export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800/60 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <span>
          © {year}{" "}
          <span className="text-slate-400 font-medium">Alex Johnson</span>. All
          rights reserved.
        </span>
        <span className="flex items-center gap-1">
          Built with{" "}
          <span className="text-cyan-500 font-medium">Next.js</span> &amp;{" "}
          <span className="text-indigo-400 font-medium">Tailwind CSS</span>
        </span>
      </div>
    </footer>
  );
}
