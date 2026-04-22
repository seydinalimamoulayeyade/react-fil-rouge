import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProjects } from "../services/projetService";
import RevealSection from "./RevealSection";

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function loadFeaturedProjects() {
      try {
        const data = await getAllProjects();
        setFeaturedProjects(data.slice(0, 3));
      } catch (error) {
        console.error("Impossible de charger les projets en vedette :", error);
        setFeaturedProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    }

    loadFeaturedProjects();
  }, []);

  return (
    <div className="space-y-16">
      <RevealSection>
        <section className="border-t border-slate-800 pt-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Projets en vedette
              </h2>
            </div>
          </div>

          {loadingProjects ? (
            <div>Chargement...</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => {
                const projectId = project._id || project.id;

                return (
                  <article key={projectId}>
                    <h3>{project.libelle}</h3>
                    <Link to={`/projets/${projectId}`}>
                      Voir le projet
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </RevealSection>
    </div>
  );
}
