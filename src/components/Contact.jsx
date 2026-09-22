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
      <Footer />
    </section>
  );
}
