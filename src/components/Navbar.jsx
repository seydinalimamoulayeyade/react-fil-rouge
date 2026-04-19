import { Link, NavLink } from "react-router-dom";

function getNavLinkClass({ isActive }) {
  return `text-sm font-medium transition-colors ${
    isActive ? "text-rose-400" : "text-slate-300 hover:text-rose-400"
  }`;
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-mono text-sm font-semibold tracking-[0.2em] text-rose-400"
        >
          &lt;SLLY /&gt;
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/" end className={getNavLinkClass}>
            Projets
          </NavLink>
          <NavLink to="/ajouter" className={getNavLinkClass}>
            Ajouter
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
