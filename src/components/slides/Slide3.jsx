import { FiSearch } from "react-icons/fi";
import { FaFigma, FaPalette, FaBrush } from "react-icons/fa";

export default function Slide3() {
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

        <div className="slide-main profile-layout">
          <h2>PERSONAL INTRODUCTION</h2>

          <div className="profile-flex">
            <div className="profile-image">
              <div className="image-placeholder">👩‍💼</div>
            </div>

            <div className="profile-info">
              <h3>JULIANA SILVA</h3>
              <p className="job-title">SENIOR GRAPHIC DESIGNER</p>

              <div className="skills-section">
                <h4>SOFTWARE SKILLS</h4>
                <div className="skills-icons">
                  <div className="skill">
                    <FaPalette className="skill-icon" />
                    <span>PS</span>
                  </div>
                  <div className="skill">
                    <FaBrush className="skill-icon" />
                    <span>AI</span>
                  </div>
                  <div className="skill">
                    <FaFigma className="skill-icon" />
                    <span>Figma</span>
                  </div>
                </div>
              </div>

              <div className="contact-info">
                <p>
                  <strong>Email:</strong> hello@reallygreatsite.com
                </p>
                <p>
                  <strong>Website:</strong> reallygreatsite.com
                </p>
                <p>
                  <strong>Location:</strong> New York, USA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
