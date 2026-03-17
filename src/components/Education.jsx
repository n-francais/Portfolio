export default function Education() {
  const education = [
    {
      school: "Université de Picardie Jules Verne",
      degree: "BUT Informatique",
      period: "2023 - 2025 (En cours - Année 2)",
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
      school: "Lycée",
      degree: "Baccalauréat Scientifique",
      period: "2022",
      description:
        "Formation générale avec spécialisation en sciences et mathématiques. Base solide en logique algorithmique et résolution de problèmes complexes.",
      specialties: [
        "Mathématiques",
        "Sciences physiques",
        "Logique algorithmique",
        "Résolution de problèmes",
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
