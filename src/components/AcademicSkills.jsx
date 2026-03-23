import { useState } from "react";
import Modal from "./Modal";

function AcademicSkills() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompetency, setSelectedCompetency] = useState(null);

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
              personalRole: "Création des différentes interfaces, Gestion des événements en front",
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
              personalRole: "Création des différentes interfaces, Gestion des événements en front",
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
              personalRole: "Création et installation des différents réseaux, Gestion des adresses",
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
              personalRole: "Rapport détaillé du projet, Création et gestion de la BDD, Analyse des données",
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
              personalRole: "Rapport du projet, Diaporama explicatif, Choix techniques",
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
              deliverables: [
                "Soutenance du projet",
              ],
            },
            {
              code: "SAÉ 2.06",
              name: "Organisation d'un travail d'équipe",
              description:
                "Conception du jeu Latice en Java et JavaFX avec création d'une interface sur Scene Builder pour le JavaFX, création du jeu en console Java et gestion des événements",
              personalRole: "Création des différentes interfaces, Gestion des événements en front",
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
button
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
    </>
  );
}

export default AcademicSkills;
