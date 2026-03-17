export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Nina Français</h4>
            <p>Développeuse Junior | BUT Informatique</p>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>
              <a href="mailto:ninafran67@gmail.com">ninafran67@gmail.com</a>
            </p>
          </div>

          <div className="footer-section">
            <h4>Suivre</h4>
            <div className="social-links">
              <a
                href="https://github.com/n-francais"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nina-français"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} NINA FRANÇAIS. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
