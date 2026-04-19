import { Link, NavLink, useLocation } from "react-router-dom";

function getHomeLinkClass({ isActive }) {
  return `inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
      : "text-slate-300 hover:text-rose-400 hover:bg-white/5"
  }`;
}

function SectionLink({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-slate-300 transition-all duration-200 hover:text-rose-400 hover:bg-white/5"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-mono text-sm font-semibold tracking-[0.2em] text-rose-400 hover:opacity-90 transition-opacity"
        >
          &lt;SLLY /&gt;
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" end className={getHomeLinkClass}>
            Accueil
          </NavLink>

          {isHome ? (
            <>
              <SectionLink href="#about">À propos</SectionLink>
              <SectionLink href="#competences">Compétences</SectionLink>
              <SectionLink href="#contact">Contact</SectionLink>
            </>
          ) : (
            <NavLink
              to="/projets"
              className={({ isActive }) =>
                `inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    : "text-slate-300 hover:text-rose-400 hover:bg-white/5"
                }`
              }
            >
              Projets
            </NavLink>
          )}
        </div>

        <div className="hidden md:block">
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-rose-600"
          >
            Me contacter
          </a>
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2.5 text-slate-300 transition-colors hover:bg-white/5 hover:text-rose-400"
          aria-label="Ouvrir le menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
