import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProject, getAllProjects } from "../services/projetService";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

export default function Dossier() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les projets.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce projet ?",
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");
      await deleteProject(id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
      setSuccess("Projet supprimé avec succès.");
    } catch (err) {
      console.error(err);
      setError("La suppression a échoué.");
    }
  }

  const filteredProjects = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return projects;

    return projects.filter((project) =>
      project.libelle.toLowerCase().includes(value),
    );
  }, [projects, search]);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-mono uppercase tracking-wider text-rose-400">
            Gestion des projets
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Liste des projets
          </h1>
          <p className="text-slate-400 leading-7">
            Consultez, recherchez et gérez les projets à partir d’une interface
            React moderne reliée à un serveur REST factice.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-center">
            <div className="text-2xl font-bold text-rose-400">{projects.length}</div>
            <div className="mt-1 text-xs text-slate-400">Projets</div>
          </div>

          <Link
            to="/ajouter"
            className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-600"
          >
            Ajouter un projet
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
        <label
          htmlFor="search-project"
          className="mb-3 block text-sm font-medium text-slate-300"
        >
          Rechercher un projet
        </label>

        <div className="relative">
          <input
            id="search-project"
            type="text"
            placeholder="Ex : portfolio, dashboard, API..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-10 text-sm text-white outline-none transition-colors focus:border-rose-400"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
            🔎
          </span>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-800 bg-red-950/30 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : null}

      {success ? (
        <div className="rounded-xl border border-emerald-800 bg-emerald-950/30 px-4 py-3">
          <p className="text-sm text-emerald-400">{success}</p>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <p className="text-sm text-slate-400">
          {loading ? "Chargement..." : `${filteredProjects.length} projet(s) trouvé(s)`}
        </p>

        {search ? (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-sm text-slate-400 transition-colors hover:text-rose-400"
          >
            Réinitialiser la recherche
          </button>
        ) : null}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-2xl text-slate-500">
            📁
          </div>
          <h2 className="text-lg font-semibold text-white">Aucun projet trouvé</h2>
          <p className="mt-2 text-sm text-slate-400">
            Essayez un autre mot-clé ou ajoutez un nouveau projet à votre collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
