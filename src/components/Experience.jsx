export default function Experience() {
  const experiences = [
    {
      company: "Lidl",
      position: "Équipière Polyvalente",
      period: "Plusieurs années",
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
                    <span key={i} className="skill-pill">
                      {skill}
                    </span>
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
    </section>
  );
}
