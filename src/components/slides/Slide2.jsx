import { FiSearch } from "react-icons/fi";

export default function Slide2() {
  return (
    <div className="slide">
      <div className="slide-sidebar">
        <div className="spiral-binding"></div>
        <nav className="slide-nav">
          <a href="#" className="nav-item">
            PERSONAL INTRODUCTION
          </a>
          <a href="#" className="nav-item">
            TABLE OF CONTENT
          </a>
          <a href="#" className="nav-item">
            BRAND IDENTITY
          </a>
          <a href="#" className="nav-item">
            UI/UX DESIGN
          </a>
          <a href="#" className="nav-item">
            SOCIAL MEDIA DESIGN
          </a>
        </nav>
      </div>

      <div className="slide-content">
        <div className="slide-header">
          <div className="search-box">
            <FiSearch />
          </div>
          <div className="header-text">
            <span>JULIANA SILVA</span>
            <span className="separator">|</span>
            <span>REALLYGREATSITE.COM</span>
            <span className="separator">|</span>
            <span>HELLO@REALLYGREATSITE.COM</span>
          </div>
        </div>

        <div className="slide-main">
          <h2>INTRODUCTION</h2>

          <div className="projects-preview-grid">
            <div className="preview-card">
              <div className="preview-image"></div>
              <h3>BRAND IDENTITY</h3>
              <p>Création d'identité visuelle cohérente</p>
            </div>
            <div className="preview-card">
              <div className="preview-image">◆</div>
              <h3>LOGO DESIGN</h3>
              <p>Conception de logos distinctifs</p>
            </div>
            <div className="preview-card">
              <div className="preview-image">📱</div>
              <h3>SOCIAL MEDIA DESIGN</h3>
              <p>Designs pour réseaux sociaux</p>
            </div>
          </div>

          <p className="description-text">
            Découvrez ma sélection de projets de design graphique et ui/ux.
            Chaque projet représente une approche unique et personnalisée.
          </p>
        </div>
      </div>
    </div>
  );
}
