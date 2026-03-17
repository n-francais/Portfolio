import { FiSearch } from "react-icons/fi";

export default function Slide5() {
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
          <h2>LOGO DESIGN.</h2>

          <div className="logos-showcase">
            <div className="logo-item">
              <div className="logo-box">◆</div>
              <p>KEITHSTON AND PARTNERS</p>
            </div>
            <div className="logo-item">
              <div className="logo-box">✦</div>
              <p>LUXURY BRAND CO.</p>
            </div>
            <div className="logo-item">
              <div className="logo-box">★</div>
              <p>DIGITAL SOLUTIONS</p>
            </div>
          </div>

          <div className="logo-description">
            <p>
              Collection de logos conçus pour diverses entreprises et marques.
              Chaque logo représente une approche unique adaptée à l'identité et
              aux valeurs de chaque client.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
