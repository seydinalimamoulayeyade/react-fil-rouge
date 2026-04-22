import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProjects } from "../services/projetService";
import RevealSection from "./RevealSection";

function FeaturedProjectCard({ project }) {
  const projectId = project._id || project.id;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-rose-400/60">
      <div className="relative h-52 overflow-hidden bg-slate-800">
        {project.image ? (
          <img
            src={project.image}
            alt={project.libelle}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Aucune image disponible
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
      </div>

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{project.libelle}</h3>
          <p className="line-clamp-3 text-sm leading-6 text-slate-400">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Link
            to={`/projets/${projectId}`}
            className="text-sm font-medium text-rose-400 transition-colors hover:text-rose-300"
          >
            Voir le projet →
          </Link>
        </div>
      </div>
    </article>
  );
}

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
    <div className="space-y-24 pb-12">
      <RevealSection>
        <section className="grid gap-12 border-b border-slate-800 pb-16 pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-mono uppercase tracking-[0.35em] text-rose-400">
                Cloud • DevOps • Fullstack
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Je conçois des applications modernes, fiables et prêtes pour le cloud.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                Bienvenue sur mon portfolio. Vous trouverez ici mes projets, mon approche technique et une interface fullstack moderne construite avec React, Express, MongoDB et JWT.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/projets"
                className="inline-flex items-center rounded-xl bg-rose-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-600"
              >
                Voir mes projets
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center rounded-xl border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-rose-400 hover:text-rose-400"
              >
                Discuter d’un projet
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-2xl font-bold text-white">React</p>
                <p className="mt-2 text-sm text-slate-400">Frontend moderne et performant</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-2xl font-bold text-white">Express</p>
                <p className="mt-2 text-sm text-slate-400">API REST propre et sécurisée</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-2xl font-bold text-white">MongoDB</p>
                <p className="mt-2 text-sm text-slate-400">Persistance flexible et scalable</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.3em] text-rose-400">
                  Stack actuelle
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Une base fullstack propre, sécurisée et évolutive.
                </h2>
              </div>

              <ul className="space-y-4 text-sm leading-7 text-slate-300">
                <li>• Frontend React avec interface moderne et responsive</li>
                <li>• Backend Express connecté à MongoDB</li>
                <li>• Authentification sécurisée avec JWT</li>
                <li>• Structure prête pour le déploiement cloud</li>
              </ul>
            </div>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section id="about" className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-rose-400">
              À propos
            </p>
            <h2 className="text-3xl font-bold text-white">Un profil orienté pratique, produit et déploiement.</h2>
          </div>

          <div className="space-y-4 text-slate-400 leading-8">
            <p>
              Je développe des applications web complètes avec une attention particulière portée à l’architecture, à l’expérience utilisateur et à la sécurité.
            </p>
            <p>
              Mon objectif est de produire des interfaces élégantes, des API robustes et des solutions prêtes à évoluer vers des environnements cloud et DevOps.
            </p>
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section id="competences" className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-rose-400">
              Compétences
            </p>
            <h2 className="text-3xl font-bold text-white">Technologies et domaines que je mobilise.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Frontend", "React, Vite, Tailwind, UI responsive"],
              ["Backend", "Node.js, Express, API REST, JWT"],
              ["Base de données", "MongoDB, Mongoose, modélisation"],
              ["Cloud & DevOps", "GitHub, déploiement, CI/CD, bonnes pratiques"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      <RevealSection>
        <section className="space-y-8 border-t border-slate-800 pt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-mono uppercase tracking-[0.3em] text-rose-400">
                Portfolio
              </p>
              <h2 className="text-3xl font-bold text-white">Projets en vedette</h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-400">
                Un aperçu de mes réalisations récentes, construites autour du fullstack moderne, de l’UX et de l’architecture d’API.
              </p>
            </div>

            <Link
              to="/projets"
              className="inline-flex items-center rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-rose-400 hover:text-rose-400"
            >
              Voir tous les projets
            </Link>
          </div>

          {loadingProjects ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-80 animate-pulse rounded-2xl border border-slate-800 bg-slate-900" />
              ))}
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
              <p className="text-sm text-slate-400">
                Aucun projet en vedette pour le moment. Ajoutez-en un depuis l’espace de gestion.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <FeaturedProjectCard key={project._id || project.id} project={project} />
              ))}
            </div>
          )}
        </section>
      </RevealSection>

      <RevealSection>
        <section id="contact" className="rounded-3xl border border-slate-800 bg-slate-900 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-mono uppercase tracking-[0.3em] text-rose-400">
                Contact
              </p>
              <h2 className="text-3xl font-bold text-white">Besoin d’un profil fullstack ou cloud pour un projet ?</h2>
              <p className="max-w-2xl text-sm leading-8 text-slate-400">
                Je peux contribuer à la conception d’une interface moderne, d’une API sécurisée ou à la structuration technique d’un projet web orienté cloud et déploiement.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <a
                href="mailto:seydinalimamoulayeyade@gmail.com"
                className="inline-flex items-center rounded-xl bg-rose-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-600"
              >
                Envoyer un email
              </a>
              <Link
                to="/projets"
                className="inline-flex items-center rounded-xl border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-rose-400 hover:text-rose-400"
              >
                Explorer les projets
              </Link>
            </div>
          </div>
        </section>
      </RevealSection>
    </div>
  );
}
