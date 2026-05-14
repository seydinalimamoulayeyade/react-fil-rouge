import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function getNavLinkClass({ isActive }) {
  return `inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "border border-rose-400/25 bg-rose-500/10 text-rose-300 shadow-[0_0_24px_rgba(244,63,94,0.08)]"
      : "text-slate-300 hover:bg-white/5 hover:text-white"
  }`;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();

  function handleLogout() {
    logout();
    setMenuOpen(false);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/82 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          onClick={closeMenu}
          className="group inline-flex items-center gap-3"
          aria-label="Retour à l'accueil"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 font-mono text-xs font-bold text-cyan-200 transition-colors group-hover:border-cyan-300/50">
            SY
          </span>
          <span>
            <span className="block font-mono text-sm font-semibold tracking-[0.2em] text-white">
              SLLY
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              AWS & DevOps developer
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" end className={getNavLinkClass}>
            Accueil
          </NavLink>
          <NavLink to="/projets" className={getNavLinkClass}>
            Projets
          </NavLink>
          {isAdmin ? (
            <NavLink to="/ajouter" className={getNavLinkClass}>
              Ajouter
            </NavLink>
          ) : null}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAdmin ? (
            <span className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-xs font-medium text-cyan-200">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3.5 w-3.5"
              >
                <path d="M12 3 20 7v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Admin
            </span>
          ) : isAuthenticated ? (
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-300">
              Connecte
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300">
              <span className="motion-status-dot h-2 w-2 rounded-full bg-current text-emerald-300" />
              Disponible
            </span>
          )}

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="inline-flex items-center rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-rose-400 hover:text-white"
            >
              Connexion
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-600"
            >
              Déconnexion
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 text-slate-200 transition-colors hover:border-rose-400 hover:text-white md:hidden"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          <span className="flex h-5 w-5 flex-col justify-center gap-1.5">
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className="motion-fade-up border-t border-slate-800 bg-slate-950 md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-5 sm:px-6">
            <NavLink to="/" end onClick={closeMenu} className={getNavLinkClass}>
              Accueil
            </NavLink>
            <NavLink to="/projets" onClick={closeMenu} className={getNavLinkClass}>
              Projets
            </NavLink>
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <>
                    <div className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 text-sm font-medium text-cyan-200">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4"
                      >
                        <path d="M12 3 20 7v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      Console admin ouverte
                    </div>
                    <NavLink to="/ajouter" onClick={closeMenu} className={getNavLinkClass}>
                      Ajouter
                    </NavLink>
                  </>
                ) : null}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-lg bg-rose-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-600"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-rose-400 hover:text-white"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
