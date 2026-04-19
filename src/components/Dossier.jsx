import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProject, getAllProjects } from "../services/projetService";
import ProjectCard from "./ProjectCard";

export default function Dossier() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      await deleteProject(id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
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

  if (loading) {
    return (
      <section className="space-y-6">
        <div>
          <p className="text-sm font-mono uppercase tracking-wider text-rose-400">
            Gestion des projets
          </p>
          <h1 className="text-3xl font-bold text-white mt-2">
            Liste des projets
          </h1>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Chargement des projets...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-sm font-mono uppercase tracking-wider text-rose-400">
            Gestion des projets
          </p>
          <h1 className="text-3xl font-bold text-white mt-2">
            Liste des projets
          </h1>
          <p className="text-slate-400 mt-3 max-w-2xl">
            Consultez, recherchez et gérez les projets à partir d’une interface
            React reliée à un serveur REST factice.
          </p>
        </div>

        <Link
          to="/ajouter"
          className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white hover:bg-rose-600 transition-colors"
        >
          Ajouter un projet
        </Link>
      </div>

      {/* Recherche */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <label
          htmlFor="search-project"
          className="block text-sm font-medium text-slate-300 mb-3"
        >
          Rechercher un projet
        </label>

        <input
          id="search-project"
          type="text"
          placeholder="Ex : portfolio, dashboard, API..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-rose-400"
        />
      </div>

      {/* Erreur */}
      {error ? (
        <div className="rounded-xl border border-red-800 bg-red-950/30 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : null}

      {/* Résultats */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {filteredProjects.length} projet(s) trouvé(s)
        </p>
      </div>

      {/* Liste */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <p className="text-slate-400">Aucun projet trouvé.</p>
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
