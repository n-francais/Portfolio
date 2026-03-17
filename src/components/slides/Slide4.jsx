import { FiSearch } from "react-icons/fi";

export default function Slide4() {
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
          <h2>BRAND IDENTITY</h2>

          <div className="project-showcase">
            <div className="showcase-image">
              <div className="image-large">🏢</div>
            </div>

            <div className="project-details">
              <h3>LICERIA & CO.</h3>
              <p className="project-subtitle">Luxury Cosmetics Brand</p>

              <div className="project-description">
                <p>
                  Création d'une identité visuelle complète pour Liceria & Co.,
                  marque de cosmétiques de luxe. Le projet inclut le design du
                  logo, la palette de couleurs, la typographie et l'ensemble des
                  applications visuelles.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="brand-colors">
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#1a1a1a" }}
                ></div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#d4af37" }}
                ></div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#f5f5f5" }}
                ></div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#8b7355" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
