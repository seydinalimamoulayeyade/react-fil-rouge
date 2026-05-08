import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="app-grid pointer-events-none fixed inset-0 opacity-80" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-6">
          <Outlet />
        </main>

        <footer className="border-t border-slate-800/80 bg-slate-950/80">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
                Cloud & DevOps
              </p>
              <p className="mt-2">
                Stack MERN/Laravel, pipelines Jenkins, conteneurs Docker et déploiements AWS.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Docker", "Jenkins", "AWS", "Trivy"].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
