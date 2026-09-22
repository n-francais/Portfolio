import semesters from "../data/semesters";
import stack from "../data/stack";
import ReferentialTabs from "./ReferentialTabs";

export default function Program() {
  return (
    <section id="competences">
      <h2>Programme et compétences</h2>
      <p className="prose">
        Le BUT Informatique est construit par le ministère autour de six compétences. Chacune
        se définit par des composantes essentielles et des situations professionnelles, et
        progresse par niveaux, validés par des apprentissages critiques. Dans le parcours
        Réalisation d'applications, Réaliser, Optimiser et Collaborer vont jusqu'au niveau 3 ;
        Administrer, Gérer et Conduire s'arrêtent au niveau 2.
      </p>

      <ol className="sems" aria-label="Déroulé de la formation">
        {semesters.map((sem) => (
          <li key={sem.code} className={sem.now ? "now" : ""}>
            <b>{sem.code}</b>
            <span>{sem.text}</span>
            {sem.note && <em>{sem.note}</em>}
          </li>
        ))}
      </ol>

      <h3 className="ref-title">Référentiel de compétences, parcours A</h3>
      <p className="ref-src">
        Présenté selon le programme national du B.U.T. Informatique publié par le ministère de
        l'Enseignement supérieur (2022). Sous chaque apprentissage critique, la preuve tirée de
        mes projets.
      </p>
      <p className="legend">
        <span className="k done">Mis en œuvre dans mes projets</span>
        <span className="k todo">À documenter</span>
        <span className="k">Validé en cours (niveau 1)</span>
      </p>

      <ReferentialTabs />

      <dl className="stack">
        {stack.map((item) => (
          <div key={item.label} style={{ display: "contents" }}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
