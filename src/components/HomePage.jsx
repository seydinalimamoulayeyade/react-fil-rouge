import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProjects } from "../services/projetService";

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
            et automatisés. Du code à l’infrastructure, je mets en place des
            environnements fiables grâce au Cloud, à la conteneurisation et aux
            pipelines CI/CD.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            {[
              "Docker",
              "CI/CD",
              "Linux",
              "Cloud",
              "Automation",
            ].map((item) => (
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
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-rose-400 hover:text-rose-400">
              Télécharger mon CV
            </button>
          </div>
        </div>

        <div className="relative flex-shrink-0">
          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-rose-400/30"></div>
          <div className="flex h-56 w-56 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-900">
            <span className="text-5xl font-bold text-slate-300">SY</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-rose-500 px-3 py-1 text-xs font-medium text-white">
            🟢 Disponible
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 pt-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Projets en vedette</h2>
            <p className="mt-2 text-sm text-slate-400">
              Une sélection de projets illustrant mon approche du développement,
              du cloud et du déploiement
            </p>
          </div>
          <Link
            to="/projets"
            className="hidden text-sm font-medium text-rose-400 hover:underline md:block"
          >
            Voir tous →
          </Link>
        </div>

        {loadingProjects ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
              >
                <div className="h-48 animate-pulse bg-slate-800"></div>
                <div className="space-y-4 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-slate-800"></div>
                  <div className="h-4 w-full animate-pulse rounded bg-slate-800"></div>
                  <div className="h-4 w-4/5 animate-pulse rounded bg-slate-800"></div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-slate-400">Aucun projet en vedette disponible.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-rose-400/70"
              >
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

                <div className="space-y-4 p-5">
                  <h3 className="text-lg font-semibold text-white">
                    {project.libelle}
                  </h3>
                  <p className="line-clamp-3 text-sm text-slate-400">
                    {project.description}
                  </p>

                  <Link
                    to={`/projets/${project.id}`}
                    className="inline-flex text-sm font-medium text-rose-400 hover:underline"
                  >
                    Voir le projet →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="about" className="border-t border-slate-800 pt-16">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-white">À propos</h2>
          <p className="mt-2 text-sm text-slate-400">
            Un parcours orienté vers le Cloud, l’automatisation et la fiabilité
            des systèmes
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 lg:col-span-2">
            <p className="text-lg leading-8 text-slate-200">
              Je construis des environnements <span className="font-medium text-rose-400">fiables</span>,
              <span className="font-medium text-rose-400"> automatisés</span> et pensés pour la
              <span className="font-medium text-rose-400"> production</span>.
            </p>

            <div className="mt-6 space-y-5 leading-8 text-slate-400">
              <p>
                Je suis un ingénieur passionné par les technologies Cloud et les
                pratiques DevOps.
              </p>
              <p>
                Mon objectif est de concevoir des systèmes robustes, automatisés
                et faciles à maintenir, en combinant développement logiciel et
                gestion d’infrastructure.
              </p>
              <p>
                J’accorde une importance particulière à la qualité du code, à la
                performance des systèmes et à l’automatisation des tâches répétitives.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="mb-4 text-xs font-mono uppercase tracking-widest text-rose-400">
              Focus actuel
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Cloud & Infrastructure</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Déploiement, environnements, architecture et fiabilité.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">Automatisation</h3>
                <p className="mt-1 text-sm text-slate-400">
                  CI/CD, scripts et optimisation des workflows techniques.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">Approche</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Construire des systèmes maintenables, robustes et évolutifs.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="competences" className="border-t border-slate-800 pt-16">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-white">Compétences</h2>
          <p className="mt-2 text-sm text-slate-400">
            Mes compétences actuelles en Cloud, DevOps, infrastructure et développement
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Cloud",
              items: ["AWS", "Azure", "Déploiement", "Environnements"],
            },
            {
              title: "DevOps",
              items: ["Docker", "CI/CD", "GitHub Actions", "Automation"],
            },
            {
              title: "Infrastructure",
              items: ["Linux", "Nginx", "Serveurs", "Configuration"],
            },
            {
              title: "Développement",
              items: ["JavaScript", "Node.js", "React", "API REST"],
            },
          ].map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
            >
              <h3 className="mb-5 text-white font-semibold">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-slate-800 pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white">Travaillons ensemble</h2>
          <p className="mt-4 leading-8 text-slate-400">
            Une idée de projet ou une opportunité en Cloud / DevOps ? Je suis
            ouvert aux collaborations, missions et opportunités professionnelles.
            N’hésitez pas à me contacter pour échanger.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:seydinalimamoulayeyade@gmail.com"
              className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-600"
            >
              Envoyer un email
            </a>
            <a
              href="https://www.linkedin.com/in/limamou-laye"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-rose-400 hover:text-rose-400"
            >
              LinkedIn
            </a>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-5 text-sm text-slate-400 sm:flex-row">
            <span>Dakar, Sénégal</span>
            <a
              href="mailto:seydinalimamoulayeyade@gmail.com"
              className="transition-colors hover:text-rose-400"
            >
              seydinalimamoulayeyade@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
