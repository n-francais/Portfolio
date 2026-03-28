import { useState } from "react";
import Modal from "./Modal";

export default function Experience() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillDescriptions = {
    Rigueur:
      "Capacité à être précis, méthodique et à respecter les standards de qualité élevés dans toutes les tâches.",
    "Travail d'équipe":
      "Aptitude à collaborer efficacement avec les collègues, partager les responsabilités et atteindre des objectifs communs.",
    Communication:
      "Savoir transmettre clairement les informations, écouter les autres et adapter son discours selon le contexte.",
    "Gestion du stress":
      "Capacité à rester calme et performant sous pression, gérer les situations difficiles avec sang-froid.",
    Responsabilité:
      "Engagement à accomplir ses tâches de manière fiable et à répondre de ses actions et décisions.",
    Leadership:
      "Aptitude à inspirer, motiver et guider les autres vers un objectif commun.",
    Organisation:
      "Capacité à planifier, structurer et gérer efficacement les ressources et les priorités.",
    "Gestion de projet":
      "Compétence à planifier, coordonner et superviser les différentes phases d'un projet du début à la fin.",
    "Coordination d'équipe":
      "Capacité à assurer la cohésion, la communication et l'efficacité du groupe.",
  };

  const experiences = [
    {
      company: "Lidl",
      position: "Équipière Polyvalente",
      period: "juin 2025 - mars 2026",
      description:
        "Travail en équipe dans un environnement dynamique et exigeant. Responsabilités variées incluant la gestion des rayons, accueil client et gestion des stocks.",
      skills: [
        "Rigueur",
        "Travail d'équipe",
        "Communication",
        "Gestion du stress",
        "Responsabilité",
      ],
    },
    {
      company: "Bureau des Étudiants (BDE)",
      position: "Vice-Présidente",
      period: "Mandat récent",
      description:
        "Responsabilité dans l'organisation et la gestion de projets associatifs. Coordination d'équipe, prise de décisions et animation d'événements étudiants.",
      skills: [
        "Leadership",
        "Organisation",
        "Gestion de projet",
        "Coordination d'équipe",
        "Communication",
      ],
    },
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2>Expérience</h2>

        <div className="experience-timeline">
          {experiences.map((exp, idx) => (
            <div key={idx} className="experience-item">
              <div className="experience-marker"></div>

              <div className="experience-content">
                <h3>{exp.company}</h3>
                <p className="position">{exp.position}</p>
                <p className="period">{exp.period}</p>
                <p className="description">{exp.description}</p>

                <div className="experience-skills">
                  {exp.skills.map((skill, i) => (
                    <button
                      key={i}
                      className="skill-pill"
                      onClick={() => setSelectedSkill(skill)}
                      type="button"
                      aria-label={`En savoir plus sur ${skill}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="experience-cta">
          <p>
            <strong>
              Passionnée par les défis techniques, je suis prête à m'investir
              pleinement dans une alternance où je pourrai contribuer et évoluer
              aux côtés de professionnels expérimentés.
            </strong>
          </p>
        </div>
      </div>

      <Modal
        isOpen={selectedSkill !== null}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill}
      >
        <p>{selectedSkill ? skillDescriptions[selectedSkill] : ""}</p>
      </Modal>
    </section>
  );
}
