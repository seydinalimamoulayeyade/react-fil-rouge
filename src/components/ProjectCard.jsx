import { Link } from "react-router-dom";

export default function ProjectCard({ project, onDelete }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm transition hover:-translate-y-1 hover:border-rose-400">
      <div className="h-48 bg-slate-800">
        {project.image ? (
          <img
            src={project.image}
            alt={project.libelle}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-500 text-sm">
            Aucune image
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        <div>
          <Link
            to={`/projets/${project.id}`}
            className="text-lg font-semibold text-white hover:text-rose-400 transition-colors"
          >
            {project.libelle}
          </Link>

          <p className="mt-2 text-sm text-slate-400 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Link
            to={`/projets/${project.id}`}
            className="text-sm font-medium text-rose-400 hover:underline"
          >
            Voir le détail
          </Link>

          <button
            onClick={() => onDelete(project.id)}
            className="inline-flex items-center rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}
