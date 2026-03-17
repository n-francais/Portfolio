export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>À propos</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Je suis Nina Français, développeuse frontend passionnée par les
              interfaces utilisateur intuitives et performantes. Actuellement en
              deuxième année de BUT Informatique, je construis mes compétences à
              travers des projets concrets et exigeants.
            </p>
            <p>
              Récemment, lors d'un projet académique nous avons travaillé avec{" "}
              <strong>Legrand</strong>, où nous avons réaliser en équipe de 5
                une application permettant d'éditer et consulter des
              modes opératoires en atelier. J'ai notamment approfondi mes
              compétences en <strong>Vue.js & TypeScript</strong>, maîtrisé les
              interactions <strong>frontend/backend</strong>, et contribué à l'
              <strong>architecture globale</strong> du projet.
            </p>
            <p>
              Rigoureuse, curieuse et investie, je suis à la recherche d'une{" "}
              <strong>alternance en développement frontend</strong> au sein
              d'une équipe dynamique. À moyen terme, je souhaite évoluer vers la{" "}
              <strong>gestion de projet</strong> pour combiner ma passion
              technique avec une vision stratégique et coordinatrice.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">2+</div>
              <div className="stat-label">Années d'études IT</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12+</div>
              <div className="stat-label">Langages/Outils</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Membres équipe Legrand</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
