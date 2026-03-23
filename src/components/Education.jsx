import { useState } from "react";
import Modal from "./Modal";

export default function Education() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showAcademicSkills, setShowAcademicSkills] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompetency, setSelectedCompetency] = useState(null);

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
          code: "C2",
          title: "Optimiser des applications",
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
        {
          code: "C4",
          title: "Gérer des données",
          projects: [
            {
              code: "SAÉ 1.04",
              name: "Création d'une base de données",
              description:
                "Création d'une base de données pour une bibliothèque avec extraction des données souhaitées",
              personalRole:
                "Rapport détaillé du projet, Création et gestion de la BDD, Analyse des données",
              deliverables: [
                "Rapport détaillé du projet avec des captures d'écrans",
                "Soutenances du projet",
              ],
            },
          ],
        },
        {
          code: "C5",
          title: "Conduire un projet",
          projects: [
            {
              code: "SAÉ 1.05",
              name: "Recueil de besoins",
              description:
                "Recueil des besoins pour la création d'un gestionnaire de bibliothèque avec présentation des choix techniques",
              personalRole:
                "Rapport du projet, Diaporama explicatif, Choix techniques",
              deliverables: [
                "Rapport du recueil des besoins",
                "Soutenance du projet",
              ],
            },
          ],
        },
        {
          code: "C6",
          title: "Collaborer au sein d'une équipe informatique",
          projects: [
            {
              code: "SAÉ 1.06",
              name: "Découverte de l'environnement économique et écologique",
              description:
                "Interview d'un professionnel et présentation lors d'une soutenance",
              personalRole: "Interview, Présentation",
              deliverables: ["Soutenance du projet"],
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

  const openModal = (competency) => {
    setSelectedCompetency(competency);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompetency(null);
  };

  return (
    <section id="education" className="education">
      <div className="container">
        <h2>Parcours</h2>

        <div className="education-timeline">
          {education.map((edu, idx) => (
            <div key={edu.school} className="education-item">
              <div className="education-marker"></div>

              <div
                className={`education-content ${
                  expandedIndex === idx ? "expanded" : ""
                }`}
              >
                <h3>{edu.school}</h3>
                <button
                  className="degree-button"
                  onClick={() => toggleExpand(idx)}
                  title="Cliquez pour voir les compétences"
                  type="button"
                >
                  {edu.degree} <span className="expand-icon">▼</span>
                </button>
                <p className="period">{edu.period}</p>
                <p className="description">{edu.description}</p>

                <div
                  className={`education-specialties ${
                    expandedIndex === idx ? "visible" : "hidden"
                  }`}
                >
                  {edu.specialties.map((specialty) => (
                    <span key={specialty} className="specialty-pill">
                      {specialty}
                    </span>
                  ))}
                </div>

                {idx === 0 && expandedIndex === 0 && showAcademicSkills && (
                  <div className="academic-skills-embedded">
                    <h4 className="academic-title">Compétences Académiques</h4>
                    {semesters.map((sem) => (
                      <div key={sem.semester} className="semester-section">
                        <h5 className="semester-title">{sem.semester}</h5>
                        <div className="competencies-grid-compact">
                          {sem.competencies.map((comp) => (
                            <button
                              key={comp.code}
                              className="competency-button-compact"
                              onClick={() => openModal(comp)}
                              type="button"
                            >
                              <span className="competency-code-compact">
                                {comp.code}
                              </span>
                              <span className="competency-title-compact">
                                {comp.title}
                              </span>
                            </button>
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

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={
            selectedCompetency
              ? `${selectedCompetency.code} - ${selectedCompetency.title}`
              : ""
          }
        >
          {selectedCompetency && (
            <div className="modal-academic-content">
              {selectedCompetency.projects.map((proj) => (
                <div key={proj.code} className="project-detail-modal">
                  <div className="project-header-modal">
                    <span className="project-code-modal">{proj.code}</span>
                    <h4 className="project-name-modal">{proj.name}</h4>
                  </div>

                  <div className="project-info-modal">
                    <div className="info-item-modal">
                      <div className="info-label">Description:</div>
                      <p>{proj.description}</p>
                    </div>

                    <div className="info-item-modal">
                      <div className="info-label">Rôle Personnel:</div>
                      <p>{proj.personalRole}</p>
                    </div>

                    <div className="info-item-modal">
                      <div className="info-label">Livrables:</div>
                      <ul className="deliverables-list-modal">
                        {proj.deliverables.map((deliverable) => (
                          <li key={deliverable}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
