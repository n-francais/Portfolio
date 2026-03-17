export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Développeuse Junior <br />
            <span className="highlight">Fullstack</span>
          </h1>
          <p className="hero-subtitle">
            Étudiante en BUT Informatique | Vue.js • Node.js • SQL • Java
          </p>
          <p className="hero-description">
            Passionnée par le développement web et logiciel. Je recherche une alternance pour continuer à apprendre et contribuer à des projets concrets.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">Voir mes projets</a>
            <a href="#contact" className="btn btn-secondary">Me contacter</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-block">
            <div className="code-header">&lt; /&gt;</div>
            <pre><code>{`const nina = {
  name: "Nina Français",
  role: "Développeuse Junior",
  location: "France",
  passion: "Développement",
  goal: "Alternance IT"
}`}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}
