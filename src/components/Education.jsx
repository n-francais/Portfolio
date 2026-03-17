import { useState } from "react";

export default function Education() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showAcademicSkills, setShowAcademicSkills] = useState(false);

  const semesters = [
    {
      semester: "Semestre 1",
      competencies: [
        {
          code: "C1",
          title: "Réaliser un développement d'application",
          projects: [
            {
              code: "SAÉ 1.01",
              name: "Implémentation d'un besoin client",
              description:
                "Concevoir des minis jeux en Python et implémentation d'algorithmes",
              personalRole: "Implémentation de toute l'application",
              deliverables: [
                "Rapport avec des captures d'écrans des jeux",
                "Soutenances du projet",
                "Dossier zip du projet",
              ],
            },
            {
              code: "SAÉ 1.02",
              name: "Comparaison d'approches algorithmiques",
              description:
                "Étude et comparaison de différentes approches pour résoudre des problèmes algorithmiques",
              personalRole: "Implémentation de toute l'application",
              deliverables: [
                "Rapport avec des captures d'écrans",
                "Soutenances du projet",
                "Dossier zip du projet",
              ],
            },
          ],
        },
        {
          code: "C3",
          title: "Administrer des systèmes",
          projects: [
            {
              code: "SAÉ 1.03",
              name: "Installation d'un poste pour le développement",
              description:
                "Installation d'une machine virtuelle Linux, gestion et création d'une bibliothèque, programmation de fonctions adaptées en C",
              personalRole:
                "Installation de la machine virtuelle, création et gestion de la bibliothèque",
              deliverables: [
                "Rapport détaillé du projet avec captures d'écrans",
                "Soutenance expliquant le processus",
              ],
            },
          ],
        },
      ],
    },
  ];

  const education = [
    {
      school: "IUT du Limousin, Campus de Limoges",
      degree: "BUT Informatique",
      period: "2024 - 2027 (En cours - Année 2)",
      description:
        "Formation en apprentissage technique et pratique. Modules couvrant le développement web, bases de données, architecture logicielle et gestion de projet. Projets concrets en équipe incluant la SAÉ Legrand.",
      specialties: [
        "Développement Web",
        "Bases de Données",
        "Architecture MVC",
        "Travail d'équipe",
        "Gestion de projet",
      ],
      hasAcademic: true,
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
      hasAcademic: false,
    },
  ];

  const toggleExpand = (idx) => {
    if (idx === 0) {
      setShowAcademicSkills(!showAcademicSkills);
    }
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="education" className="education">
      <div className="container">
        <h2>Parcours</h2>

        <div className="education-timeline">
          {education.map((edu, idx) => (
            <div key={idx} className="education-item">
              <div className="education-marker"></div>

              <div
                className={`education-content ${
                  expandedIndex === idx ? "expanded" : ""
                }`}
              >
                <h3>{edu.school}</h3>
                <p
                  className="degree clickable"
                  onClick={() => toggleExpand(idx)}
                  title="Cliquez pour voir les compétences"
                >
                  {edu.degree} <span className="expand-icon">▼</span>
                </p>
                <p className="period">{edu.period}</p>
                <p className="description">{edu.description}</p>

                <div
                  className={`education-specialties ${
                    expandedIndex === idx ? "visible" : "hidden"
                  }`}
                >
                  {edu.specialties.map((specialty, i) => (
                    <span key={i} className="specialty-pill">
                      {specialty}
                    </span>
                  ))}
                </div>

                {idx === 0 && expandedIndex === 0 && showAcademicSkills && (
                  <div className="academic-skills-embedded">
                    <h4 className="academic-title">Compétences Académiques</h4>
                    {semesters.map((sem, semIdx) => (
                      <div key={semIdx} className="semester-section">
                        <h5 className="semester-title">{sem.semester}</h5>
                        <div className="competencies-grid">
                          {sem.competencies.map((comp, compIdx) => (
                            <div key={compIdx} className="competency-card">
                              <div className="competency-header">
                                <span className="competency-code">
                                  {comp.code}
                                </span>
                                <h6 className="competency-title">
                                  {comp.title}
                                </h6>
                              </div>

                              <div className="competency-projects">
                                {comp.projects.map((proj, projIdx) => (
                                  <div key={projIdx} className="project-detail">
                                    <div className="project-code-name">
                                      <span className="project-code">
                                        {proj.code}
                                      </span>
                                      <p className="project-name">
                                        {proj.name}
                                      </p>
                                    </div>

                                    <div className="project-info">
                                      <div className="info-item">
                                        <label>Description:</label>
                                        <p>{proj.description}</p>
                                      </div>

                                      <div className="info-item">
                                        <label>Rôle Personnel:</label>
                                        <p>{proj.personalRole}</p>
                                      </div>

                                      <div className="info-item">
                                        <label>Livrables:</label>
                                        <ul className="deliverables-list">
                                          {proj.deliverables.map(
                                            (deliverable, idx) => (
                                              <li key={idx}>{deliverable}</li>
                                            ),
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
