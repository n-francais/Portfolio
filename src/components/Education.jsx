export default function Education() {
  const education = [
    {
      school: "IUT du Limousin, Campus de Limoges",
      degree: "BUT Informatique",
      period: "2024 - 2027 (En cours - Année 1)",
      description:
        "Formation en apprentissage technique et pratique. Modules couvrant le développement web, bases de données, architecture logicielle et gestion de projet. Projets concrets en équipe incluant la SAÉ Legrand.",
      specialties: [
        "Développement Web",
        "Bases de Données",
        "Architecture MVC",
        "Travail d'équipe",
        "Gestion de projet",
      ],
    },
    {
      school: "Lycée Jean Macé, Niort",
      degree: "Baccalauréat Général",
      period: "2024",
      description:
        "Formation générale avec spécialisations en Mathématiques, NSI (Numérique et Science de l'Informatique) et Art Plastique. Développement de l'esprit critique, créativité et apprentissage des bases de la programmation.",
      specialties: [
        "Mathématiques",
        "NSI (Informatique)",
        "Art Plastique",
        "Pensée critique",
        "Créativité",
      ],
    },
  ];

  return (
    <section id="education" className="education">
      <div className="container">
        <h2>Parcours</h2>

        <div className="education-timeline">
          {education.map((edu, idx) => (
            <div key={idx} className="education-item">
              <div className="education-marker"></div>

              <div className="education-content">
                <h3>{edu.school}</h3>
                <p className="degree">{edu.degree}</p>
                <p className="period">{edu.period}</p>
                <p className="description">{edu.description}</p>

                <div className="education-specialties">
                  {edu.specialties.map((specialty, i) => (
                    <span key={i} className="specialty-pill">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
