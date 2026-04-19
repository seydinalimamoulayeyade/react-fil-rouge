import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectById } from "../services/projetService";

export default function DetaillerProjet() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const data = await getProjectById(id);
        setProject(data);
      } catch (err) {
        console.error(err);
        setError("Projet introuvable.");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto space-y-6">
        <Link to="/" className="text-sm text-rose-400 hover:underline">
          ← Retour à la liste
        </Link>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Chargement du projet...</p>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="max-w-4xl mx-auto space-y-6">
        <Link to="/" className="text-sm text-rose-400 hover:underline">
          ← Retour à la liste
        </Link>

        <div className="rounded-2xl border border-red-800 bg-red-950/30 p-6">
          <p className="text-red-400 text-sm">
            {error || "Projet introuvable."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto space-y-8">
      <Link
        to="/"
        className="inline-flex text-sm text-rose-400 hover:underline"
      >
        ← Retour à la liste
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          {project.image ? (
            <img
              src={project.image}
              alt={project.libelle}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-80 items-center justify-center text-slate-500 text-sm">
              Aucune image disponible
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-rose-400">
              Projet
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              {project.libelle}
            </h1>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">
              Description
            </h2>
            <p className="text-slate-400 leading-7">
              {project.description || "Aucune description disponible."}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">
              Informations complémentaires
            </h2>
            <p className="text-slate-400 leading-7">
              {project.details || "Aucun détail supplémentaire disponible."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
