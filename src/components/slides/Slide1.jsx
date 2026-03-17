import { FiSearch } from "react-icons/fi";

export default function Slide1() {
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
          <h1 className="portfolio-title">PORTFOLIO.</h1>
          <div className="year-badge">20|24</div>

          <div className="categories-grid">
            <div className="category-box">
              <div className="category-icon">🎨</div>
              <p>UI/UX DESIGN</p>
            </div>
            <div className="category-box">
              <div className="category-icon">✨</div>
              <p>BRANDING DESIGN</p>
            </div>
            <div className="category-box">
              <div className="category-icon">◆</div>
              <p>LOGO DESIGN</p>
            </div>
            <div className="category-box">
              <div className="category-icon">★</div>
              <p>GRAPHIC DESIGN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
