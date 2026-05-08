import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="motion-fade-up mx-auto max-w-4xl overflow-hidden rounded-lg border border-slate-800 bg-slate-900/85">
      <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-slate-800 bg-slate-950 p-8 lg:border-b-0 lg:border-r">
          <p className="font-mono text-7xl font-bold text-slate-800">404</p>
          <div className="mt-8 rounded-lg border border-red-400/20 bg-red-400/10 p-4">
            <p className="text-sm font-semibold text-red-200">Route indisponible</p>
            <p className="mt-2 text-sm leading-6 text-red-100/65">
              Le chemin demandé n'est pas exposé par l'application.
            </p>
          </div>
        </div>

        <div className="space-y-6 p-8">
          <div>
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-rose-300">
              Navigation
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white">
              Page introuvable
            </h1>
            <p className="mt-3 text-slate-400">
              Revenez vers une section disponible du portfolio.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className="inline-flex items-center rounded-lg bg-rose-500 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-600"
            >
              Retour à l'accueil
            </Link>
            <Link
              to="/projets"
              className="inline-flex items-center rounded-lg border border-slate-600 px-5 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-white"
            >
              Voir les projets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
