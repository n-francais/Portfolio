import { FiSearch } from "react-icons/fi";

export default function Slide6() {
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
          <h2>UI/UX DESIGN.</h2>

          <div className="ui-showcase">
            <div className="device-mockup">
              <div className="mockup-screen">💻</div>
            </div>
          </div>

          <div className="ui-details">
            <h3>LICERIA & CO.</h3>
            <p className="ui-subtitle">Web & Mobile Application Design</p>

            <div className="ui-description">
              <p>
                Conception complète de l'interface utilisateur et de
                l'expérience pour l'application web et mobile de Liceria & Co.
                Le projet comprend la création de wireframes, prototypes et
                designs haute fidélité.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
