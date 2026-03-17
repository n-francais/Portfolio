export default function Header() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#hero" className="logo-text">
            Nina Français
          </a>
          <span className="logo-badge">Dev Junior</span>
        </div>
        <nav className="navbar-menu">
          <a href="#about" className="nav-link">
            À propos
          </a>
          <a href="#skills" className="nav-link">
            Compétences
          </a>
          <a href="#academic-skills" className="nav-link">
            ACCES
          </a>
          <a href="#projects" className="nav-link">
            Projets
          </a>
          <a href="#education" className="nav-link">
            Parcours
          </a>
          <a href="#experience" className="nav-link">
            Expérience
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
