import { Link } from 'react-router-dom'

export default function ProjectCard({ project, onDelete }) {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
      <div className="h-40 bg-slate-800">
        {project.image && (
          <img src={project.image} alt={project.libelle} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="p-4 space-y-3">
        <Link to={`/projets/${project.id}`} className="text-lg font-semibold text-white hover:text-rose-400">
          {project.libelle}
        </Link>

        <p className="text-sm text-slate-400">{project.description}</p>

        <button
          onClick={() => onDelete(project.id)}
          className="bg-red-500 px-3 py-1 rounded text-white text-sm"
        >
          Supprimer
        </button>
      </div>
    </div>
  )
}
