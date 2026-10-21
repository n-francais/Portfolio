import { useState } from "react";
import Footer from "./Footer";
import useMagnetic from "../hooks/useMagnetic";
import { MailIcon, PhoneIcon, LinkedInIcon, PinIcon, CopyIcon, CheckIcon } from "./icons";

const EMAIL = "ninafran67@gmail.com";

const TOPICS = [
  "Mon parcours et mes projets",
  "Une candidature en école d'ingénieur ou en master",
  "Un projet, une mission ou une collaboration",
];

export default function Contact() {
  const magnet = useMagnetic();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact">
      <div className="cta">
        <h2>Travaillons ensemble</h2>
        <p>
          Une question sur mon parcours, mes projets ou ma candidature en école d'ingénieur ou en
          master ? Écrivez-moi, je vous réponds rapidement.
        </p>
        <div className="btns">
          <a
            className="btn magnetic"
            href={`mailto:${EMAIL}`}
            onMouseMove={magnet.onMouseMove}
            onMouseLeave={magnet.onMouseLeave}
          >
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

      <div className="status">
        <div>
          <strong>Disponibilité</strong>
          En alternance chez Legrand jusqu'à la fin de mon BUT, et en recherche d'une école ou
          d'un master pour la rentrée 2027.
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <a className="contact-main" href={`mailto:${EMAIL}`}>
            <span className="contact-icon">
              <MailIcon />
            </span>
            <span className="contact-text">
              <small>E-mail</small>
              <b>{EMAIL}</b>
            </span>
          </a>
          <button type="button" className="copy-btn" onClick={copyEmail} aria-label="Copier l'adresse e-mail">
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span>{copied ? "Copié" : "Copier"}</span>
          </button>
        </div>

        <div className="contact-card">
          <a className="contact-main" href="tel:+33699119604">
            <span className="contact-icon">
              <PhoneIcon />
            </span>
            <span className="contact-text">
              <small>Téléphone</small>
              <b>+33 6 99 11 96 04</b>
            </span>
          </a>
        </div>

        <div className="contact-card">
          <a
            className="contact-main"
            href="https://www.linkedin.com/in/nina-fran%C3%A7ais"
            target="_blank"
            rel="noopener"
          >
            <span className="contact-icon">
              <LinkedInIcon />
            </span>
            <span className="contact-text">
              <small>LinkedIn</small>
              <b>Nina Français</b>
            </span>
          </a>
        </div>

        <div className="contact-card">
          <div className="contact-main">
            <span className="contact-icon">
              <PinIcon />
            </span>
            <span className="contact-text">
              <small>Localisation</small>
              <b>Limoges · permis B</b>
            </span>
          </div>
        </div>
      </div>

      <div className="contact-topics">
        <h3>Pour me contacter au sujet de</h3>
        <ul className="tags">
          {TOPICS.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>

      <Footer />
    </section>
  );
}
