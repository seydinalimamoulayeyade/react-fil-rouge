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
        <section className="flex flex-col items-center gap-12 py-12 md:flex-row md:justify-between md:py-20">
          <div className="max-w-2xl text-center md:text-left">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-rose-400">
              Disponible pour opportunités Cloud & DevOps
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">
              Seydina Limamou <br />
              <span className="text-rose-400">Laye Yade</span>
            </h1>

            <p className="mt-5 text-xl font-medium text-slate-300 md:text-2xl">
              Ingénieur Cloud & DevOps
            </p>

            <p className="mt-6 max-w-xl leading-8 text-slate-400">
              Je transforme des applications en systèmes déployables, scalables
              et automatisés.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              {["Docker", "CI/CD", "Linux", "Cloud"].map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-mono text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                to="/projets"
                className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-600"
              >
                Voir mes projets
              </Link>
            </div>
          </div>

          <div className="relative flex-shrink-0">
            <div className="absolute -inset-3 rounded-full border-2 border-dashed border-rose-400/30"></div>
            <div className="flex h-56 w-56 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-900">
              <span className="text-5xl font-bold text-slate-300">SY</span>
            </div>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section className="border-t border-slate-800 pt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Projets en vedette</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loadingProjects
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-48 bg-slate-800 animate-pulse rounded-2xl"></div>
                ))
              : featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="h-48 bg-slate-800 rounded-xl overflow-hidden">
                      {project.image && (
                        <img
                          src={project.image}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h3 className="mt-3 text-white">{project.libelle}</h3>
                  </div>
                ))}
          </div>
        </section>
      </RevealSection>
    </div>
  );
}
