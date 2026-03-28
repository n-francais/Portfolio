import { useState } from "react";
import Modal from "./Modal";

function AcademicSkills() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompetency, setSelectedCompetency] = useState(null);

  const competencyDetails = {
    C1: {
      title: "Réaliser",
      shortDescription:
        "Développer — c'est-à-dire concevoir, coder, tester et intégrer — une solution informatique pour un client.",
      elements: [
        {
          code: "CE1.01",
          description: "en respectant les besoins décrits par le client",
        },
        {
          code: "CE1.03",
          description: "en appliquant les principes algorithmiques",
        },
        {
          code: "CE1.04",
          description: "en veillant à la qualité du code et à sa documentation",
        },
        {
          code: "CE1.06",
          description: "en choisissant les ressources techniques appropriées",
        },
      ],
    },
    C2: {
      title: "Optimiser",
      shortDescription:
        "Proposer des applications informatiques optimisées en fonction de critères spécifiques : temps d'exécution, précision, consommation de ressources.",
      elements: [
        {
          code: "CE2.01",
          description: "en formalisant et modélisant des situations complexes",
        },
        {
          code: "CE2.02",
          description:
            "en recensant les algorithmes et les structures de données usuels",
        },
        {
          code: "CE2.03",
          description: "en s'appuyant sur des schémas de raisonnement",
        },
        {
          code: "CE2.04",
          description: "en justifiant les choix et validant les résultats",
        },
      ],
    },
    C3: {
      title: "Administrer",
      shortDescription:
        "Installer, configurer, mettre à disposition, maintenir en conditions opérationnelles des infrastructures, des services et des réseaux et optimiser le système informatique d'une organisation.",
      elements: [
        {
          code: "CE3.01",
          description: "en sécurisant le système d'information",
        },
        {
          code: "CE3.03",
          description:
            "en appliquant les normes en vigueur et les bonnes pratiques architecturales et de sécurité",
        },
        {
          code: "CE3.02",
          description: "en offrant une qualité de service optimale",
        },
        { code: "CE3.04", description: "en assurant la continuité d'activité" },
      ],
    },
    C4: {
      title: "Gérer",
      shortDescription:
        "Concevoir, gérer, administrer et exploiter les données de l'entreprise et mettre à disposition toutes les informations pour un bon pilotage de l'entreprise.",
      elements: [
        {
          code: "CE4.01",
          description:
            "en respectant les réglementations sur le respect de la vie privée et la protection des données personnelles",
        },
        {
          code: "CE4.02",
          description:
            "en respectant les enjeux économiques, sociétaux et écologiques de l'utilisation du stockage de données, ainsi que les différentes infrastructures (data centers, cloud, etc.)",
        },
        {
          code: "CE4.03",
          description: "en s'appuyant sur des bases mathématiques",
        },
        {
          code: "CE4.05",
          description: "en assurant la cohérence et la qualité",
        },
      ],
    },
    C5: {
      title: "Conduire",
      shortDescription:
        "Satisfaire les besoins des utilisateurs au regard de la chaîne de valeur du client, organiser et piloter un projet informatique avec des méthodes classiques ou agiles.",
      elements: [
        {
          code: "CE5.04",
          description:
            "en adoptant une démarche proactive, créative et critique",
        },
        {
          code: "CE5.02",
          description:
            "en respectant les règles juridiques et les normes en vigueur",
        },
        {
          code: "CE5.01",
          description:
            "en communiquant efficacement avec les différents acteurs d'un projet",
        },
        {
          code: "CE5.03",
          description:
            "en sensibilisant à une gestion éthique, responsable, durable et interculturelle",
        },
      ],
    },
    C6: {
      title: "Collaborer",
      shortDescription:
        "Acquérir, développer et exploiter les aptitudes nécessaires pour travailler efficacement dans une équipe informatique.",
      elements: [
        {
          code: "CE6.01",
          description:
            "en inscrivant sa démarche au sein d'une équipe pluridisciplinaire",
        },
        {
          code: "CE6.02",
          description:
            "en accompagnant la mise en œuvre des évolutions informatiques",
        },
        {
          code: "CE6.03",
          description: "en veillant au respect des contraintes juridiques",
        },
        {
          code: "CE6.04",
          description:
            "en développant une communication efficace et collaborative",
        },
      ],
    },
  };

  const competencyDescriptions = {
    C1: "Capacité à concevoir, développer et implémenter des applications informatiques en répondant aux besoins spécifiques des clients.",
    C2: "Compétence à analyser les performances d'une application et à mettre en œuvre des optimisations pour améliorer son efficacité.",
    C3: "Aptitude à installer, configurer et maintenir des systèmes informatiques, ainsi que à gérer les machines virtuelles et environnements.",
    C4: "Compétence à concevoir, créer et gérer des bases de données, et à analyser les données de manière efficace.",
    C5: "Capacité à planifier, organiser et diriger un projet informatique du début à la fin.",
    C6: "Aptitude à travailler efficacement en équipe, à communiquer et à collaborer avec d'autres développeurs et professionnels.",
  };

  const competencySubSkillsDetailed = {
    C1: [
      {
        code: "ACE1.01",
        description:
          "Réaliser un développement d'application en respectant les besoins décrits par le client",
      },
      {
        code: "ACE1.03",
        description:
          "Réaliser un développement d'application en appliquant les principes algorithmiques",
      },
      {
        code: "ACE1.04",
        description:
          "Réaliser un développement d'application en veillant à la qualité du code et à sa documentation",
      },
      {
        code: "ACE1.06",
        description:
          "Réaliser un développement d'application en choisissant les ressources techniques appropriées",
      },
    ],
    C2: [
      {
        code: "ACE2.01",
        description:
          "Optimiser des applications en formalisant et modélisant des situations complexes",
      },
      {
        code: "ACE2.02",
        description:
          "Optimiser des applications en recensant les algorithmes et les structures de données usuels",
      },
      {
        code: "ACE2.03",
        description:
          "Optimiser des applications en s'appuyant sur des schémas de raisonnement",
      },
      {
        code: "ACE2.04",
        description:
          "Optimiser des applications en justifiant les choix et validant les résultats",
      },
    ],
    C3: [
      {
        code: "ACE3.01",
        description:
          "Administrer des systèmes en sécurisant le système d'information",
      },
      {
        code: "ACE3.03",
        description:
          "Administrer des systèmes en appliquant les normes en vigueur et les bonnes pratiques architecturales et de sécurité",
      },
      {
        code: "ACE3.02",
        description:
          "Administrer des systèmes en offrant une qualité de service optimale",
      },
      {
        code: "ACE3.04",
        description:
          "Administrer des systèmes en assurant la continuité d'activité",
      },
    ],
    C4: [
      {
        code: "ACE4.01",
        description:
          "Gérer des données en respectant les réglementations sur le respect de la vie privée et la protection des données personnelles",
      },
      {
        code: "ACE4.02",
        description:
          "Gérer des données en respectant les enjeux économiques, sociétaux et écologiques de l'utilisation du stockage de données, ainsi que les différentes infrastructures (data centers, cloud, etc.)",
      },
      {
        code: "ACE4.03",
        description:
          "Gérer des données en s'appuyant sur des bases mathématiques",
      },
      {
        code: "ACE4.05",
        description: "Gérer des données en assurant la cohérence et la qualité",
      },
    ],
    C5: [
      {
        code: "ACE5.04",
        description:
          "Conduire un projet en adoptant une démarche proactive, créative et critique",
      },
      {
        code: "ACE5.02",
        description:
          "Conduire un projet en respectant les règles juridiques et les normes en vigueur",
      },
      {
        code: "ACE5.01",
        description:
          "Conduire un projet en communiquant efficacement avec les différents acteurs d'un projet",
      },
      {
        code: "ACE5.03",
        description:
          "Conduire un projet en sensibilisant à une gestion éthique, responsable, durable et interculturelle",
      },
    ],
    C6: [
      {
        code: "ACE6.01",
        description:
          "Collaborer au sein d'une équipe informatique en inscrivant sa démarche au sein d'une équipe pluridisciplinaire",
      },
      {
        code: "ACE6.02",
        description:
          "Collaborer au sein d'une équipe informatique en accompagnant la mise en œuvre des évolutions informatiques",
      },
      {
        code: "ACE6.03",
        description:
          "Collaborer au sein d'une équipe informatique en veillant au respect des contraintes juridiques",
      },
      {
        code: "ACE6.04",
        description:
          "Collaborer au sein d'une équipe informatique en développant une communication efficace et collaborative",
      },
    ],
  };

  const semesters = [
    {
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
            {
              code: "SAÉ 2.01",
              name: "Développement d'une application",
              description:
                "Conception du jeu Latice en Java et JavaFX avec création d'une interface sur Scene Builder pour le JavaFX, création du jeu en console Java et gestion des événements",
              personalRole:
                "Création des différentes interfaces, Gestion des événements en front",
              deliverables: [
                "Différentes versions du projet",
                "Soutenances du projet",
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
            {
              code: "SAÉ 2.02",
              name: "Exploration algorithmique d'un problème",
              description:
                "Conception du jeu Latice en Java et JavaFX avec création d'une interface sur Scene Builder pour le JavaFX, création du jeu en console Java et gestion des événements",
              personalRole:
                "Création des différentes interfaces, Gestion des événements en front",
              deliverables: [
                "Différentes versions du projet",
                "Soutenances du projet",
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
            {
              code: "SAÉ 2.03",
              name: "Installation de services réseau",
              description:
                "Création d'un réseau sous Kathara avec implémentation de serveurs DNS, SSH, et DHCP, gestion des adresses IP",
              personalRole:
                "Création et installation des différents réseaux, Gestion des adresses",
              deliverables: [
                "Rapport et explication du projet",
                "Soutenance et démonstration du projet",
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
            {
              code: "SAÉ 2.06",
              name: "Organisation d'un travail d'équipe",
              description:
                "Conception du jeu Latice en Java et JavaFX avec création d'une interface sur Scene Builder pour le JavaFX, création du jeu en console Java et gestion des événements",
              personalRole:
                "Création des différentes interfaces, Gestion des événements en front",
              deliverables: [
                "Différentes versions du projet",
                "Soutenances du projet",
              ],
            },
          ],
        },
      ],
    },
  ];

  const openModal = (competency) => {
    setSelectedCompetency(competency);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompetency(null);
  };

  return (
    <>
      <section id="academic-skills" className="academic-skills">
        <div className="container">
          <h2>Compétences Académiques</h2>
          <p className="section-subtitle">
            Cliquez sur une compétence pour voir les détails
          </p>

          {semesters.map((sem) => (
            <div key={sem.semester} className="semester-section">
              <div className="competencies-grid">
                {sem.competencies.map((comp) => (
                  <button
                    key={comp.code}
                    className="competency-card-button"
                    onClick={() => openModal(comp)}
                    type="button"
                  >
                    <div className="competency-header">
                      <span className="competency-code">{comp.code}</span>
                      <h4 className="competency-title">{comp.title}</h4>
                    </div>

                    <div className="competency-projects-preview">
                      <p className="projects-count">
                        {comp.projects.length}{" "}
                        {comp.projects.length > 1 ? "projets" : "projet"}
                      </p>
                      <p className="click-hint">
                        Cliquez pour voir les détails
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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
            <div className="competency-description-modal">
              <p>
                <strong>Description:</strong>
              </p>
              <p>{competencyDescriptions[selectedCompetency.code]}</p>
            </div>

            <hr style={{ margin: "20px 0" }} />

            <div className="projects-section-modal">
              <p>
                <strong>Projets associés:</strong>
              </p>
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

                    <div className="info-item-modal">
                      <div className="info-label">Sous-compétences (ACE):</div>
                      <ul className="deliverables-list-modal">
                        {(
                          competencySubSkillsDetailed[
                            selectedCompetency.code
                          ] || []
                        ).map((subSkill) => (
                          <li key={subSkill.code}>
                            <strong>{subSkill.code}</strong> —{" "}
                            {subSkill.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default AcademicSkills;
