import { useState } from "react";
import Sheet, { Chips } from "./Sheet";

const EMAIL = "ninafran67@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/nina-fran%C3%A7ais";
const GITHUB = "https://github.com/n-francais";

const TOPICS = [
  "Mon parcours et mes projets",
  "Une candidature en école d'ingénieur ou en master",
  "Un projet, une mission ou une collaboration",
];

export default function Contact() {
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
    <Sheet title="Contact">
      <div className="cta">
        <h3>Travaillons ensemble</h3>
        <p>
          Une question sur mon parcours, mes projets ou ma candidature en école d&apos;ingénieur ou
          en master ? Écrivez-moi, je vous réponds rapidement.
        </p>
        <div className="btns">
          <a className="btn primary" href={`mailto:${EMAIL}`}>M&apos;écrire</a>
          <a className="btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer">Voir mon LinkedIn</a>
          <a className="btn" href={GITHUB} target="_blank" rel="noopener noreferrer">Voir mon GitHub</a>
        </div>
      </div>

      <div className="status">
        <div>
          <strong>Disponibilité</strong>
          En alternance chez Legrand jusqu&apos;à la fin de mon BUT, et en recherche d&apos;une
          école ou d&apos;un master pour la rentrée 2027.
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-card wide">
          <a href={`mailto:${EMAIL}`}>
            <small>E-mail</small>
            <b>{EMAIL}</b>
          </a>
          <button type="button" className="copy" onClick={copyEmail} aria-label="Copier l'adresse e-mail">
            {copied ? "Copié" : "Copier"}
          </button>
        </div>
        <div className="contact-card">
          <a href="tel:+33699119604">
            <small>Téléphone</small>
            <b>+33 6 99 11 96 04</b>
          </a>
        </div>
        <div className="contact-card">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            <small>LinkedIn</small>
            <b>Nina Français</b>
          </a>
        </div>
        <div className="contact-card">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            <small>GitHub</small>
            <b>n-francais</b>
          </a>
        </div>
        <div className="contact-card">
          <div className="cc">
            <small>Localisation</small>
            <b>Limoges · permis B</b>
          </div>
        </div>
      </div>

      <p className="label">Pour me contacter au sujet de</p>
      <Chips items={TOPICS} />
    </Sheet>
  );
}
