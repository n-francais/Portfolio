export default function Projects() {
  const projects = [
    {
      title: "Application Web Fullstack – Legrand",
      subtitle: "SAÉ (Situation d'Apprentissage Évaluée)",
      description:
        "Plateforme d'édition et lecture de modes opératoires pour la conception des ateliers Legrand.",
      longDescription:
        "SAÉ réalisée en équipe de 5 personnes. Développement complet d'une plateforme web permettant aux concepteurs et opérateurs d'atelier de créer, éditer et consulter les modes opératoires. Architecture fullstack robuste avec gestion de base de données complexes, interface interactive et sécurisation des données critiques pour la production.",
      tech: [
        "Vue.js",
        "TypeScript",
        "Node.js",
        "SQL Server",
        "Architecture MVC",
      ],
      impact: "Plateforme opérationnelle en environnement production Legrand",
      featured: true,
    },
    {
      title: "Jeu Latice",
      subtitle: "Projet en Java avec interface graphique",
      description:
        "Implémentation du jeu Latice avec une interface JavaFX en architecture MVC.",
      longDescription:
        "Développement d'un jeu de plateau complet en Java. Architecture MVC appliquée avec modèle de données, vue avec JavaFX et contrôleur gérant la logique du jeu. Gestion des états du jeu, validation des coups et interaction utilisateur.",
      tech: ["Java", "JavaFX", "Architecture MVC"],
      impact: "Expérience en architecture logicielle et design patterns",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Mes Projets</h2>

        <div className="projects-list">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`project-card ${project.featured ? "featured" : ""}`}
            >
              {project.featured && (
                <span className="featured-badge">PROJET PRINCIPAL</span>
              )}

              <div className="project-header">
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
              </div>

              <p className="project-desc">{project.longDescription}</p>

              <div className="project-tech">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>

              <p className="project-impact">✓ {project.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
