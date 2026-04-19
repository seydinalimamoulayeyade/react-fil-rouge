import { useEffect, useMemo, useState } from 'react'
import { deleteProject, getAllProjects } from '../services/projetService'
import ProjectCard from './ProjectCard'

export default function Dossier() {
  const [projects, setProjects] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        const data = await getAllProjects()
        setProjects(data)
      } catch (err) {
        setError('Impossible de charger les projets')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  async function handleDelete(id) {
    try {
      await deleteProject(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch {
      setError('Erreur lors de la suppression')
    }
  }

  const filteredProjects = useMemo(() => {
    const value = search.toLowerCase()
    return projects.filter((p) => p.libelle.toLowerCase().includes(value))
  }, [projects, search])

  if (loading) return <p className="text-slate-400">Chargement...</p>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Mes projets</h1>

      <input
        type="text"
        placeholder="Rechercher un projet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded bg-slate-800 text-white"
      />

      {error && <p className="text-red-400">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
