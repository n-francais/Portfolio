import Footer from "./Footer";

export default function Contact() {
  return (
    <section id="contact">
      <div className="cta">
        <h2>Travaillons ensemble</h2>
        <p>
          Une question sur mon parcours, mes projets ou ma candidature en école d'ingénieur ?
          Écrivez-moi, je vous réponds rapidement.
        </p>
        <div className="btns">
          <a className="btn" href="mailto:ninafran67@gmail.com">
            M'écrire
          </a>
          <a
            className="btn ghost"
            href="https://www.linkedin.com/in/nina-fran%C3%A7ais"
            target="_blank"
            rel="noopener"
          >
            Voir mon LinkedIn
          </a>
        </div>
      </div>

      <div className="contact">
        <a href="mailto:ninafran67@gmail.com">ninafran67@gmail.com</a>
        <a href="tel:+33699119604">+33 6 99 11 96 04</a>
        <a href="https://www.linkedin.com/in/nina-fran%C3%A7ais" target="_blank" rel="noopener">
          LinkedIn
        </a>
        <span>Limoges · permis B</span>
      </div>

      <Footer />
    </section>
  );
}
