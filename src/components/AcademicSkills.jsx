export default function AcademicSkills() {
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

  return (
    <section id="academic-skills" className="academic-skills">
      <div className="container">
        <h2>Compétences Académiques</h2>

        {semesters.map((sem, semIdx) => (
          <div key={semIdx} className="semester-section">
            <h3 className="semester-title">{sem.semester}</h3>

            <div className="competencies-grid">
              {sem.competencies.map((comp, compIdx) => (
                <div key={compIdx} className="competency-card">
                  <div className="competency-header">
                    <span className="competency-code">{comp.code}</span>
                    <h4 className="competency-title">{comp.title}</h4>
                  </div>

                  <div className="competency-projects">
                    {comp.projects.map((proj, projIdx) => (
                      <div key={projIdx} className="project-detail">
                        <div className="project-code-name">
                          <span className="project-code">{proj.code}</span>
                          <p className="project-name">{proj.name}</p>
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
                              {proj.deliverables.map((deliverable, idx) => (
                                <li key={idx}>{deliverable}</li>
                              ))}
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
    </section>
  );
}
