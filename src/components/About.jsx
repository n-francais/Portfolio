import Sheet from "./Sheet";

export default function About() {
  return (
    <Sheet
      title="À propos"
      lead="J'aime écrire du code, mais ce qui me motive vraiment, c'est de faire avancer un projet avec une équipe : comprendre le besoin, organiser le travail, puis livrer."
    >
      <div className="status">
        <div>
          <strong>Rentrée 2027</strong>
          Je vise une école d&apos;ingénieur ou un master pour m&apos;orienter vers le management et
          la gestion de projet informatique.
        </div>
      </div>
      <div className="prose" style={{ marginTop: "1.4rem" }}>
        <p>
          Je suis en 3<sup>e</sup> année du BUT Informatique de l&apos;IUT du Limousin, parcours{" "}
          <strong>Réalisation d&apos;applications</strong>. Chez Legrand, j&apos;ai d&apos;abord
          développé seule un outil de monitoring pour XLPro4 Tableaux, du recueil du besoin à la
          livraison. Depuis septembre 2026, je travaille en alternance sur des API, au sein d&apos;une
          équipe.
        </p>
        <p>
          Ce que je retiens de ces projets, c&apos;est que le code n&apos;est qu&apos;une partie du
          travail. Au BUT, j&apos;ai monté le backlog sur Azure DevOps pour l&apos;application de
          modes opératoires, animé des sprints Scrum et rédigé un cahier des charges avec
          priorisation MoSCoW. C&apos;est à ces moments-là que je me sens le plus à ma place.
        </p>
        <p>
          Vice-présidente du bureau des étudiants de ma formation, j&apos;ai coordonné une équipe et
          des événements. Le rugby, le handball et l&apos;orchestre m&apos;ont appris la même chose :
          chacun a son rôle, et l&apos;on avance ensemble.
        </p>
        <p>
          Pour la suite, je veux garder une base technique solide tout en me tournant vers le{" "}
          <strong>management et la gestion de projet</strong>, en école d&apos;ingénieur ou en master.
        </p>
      </div>
    </Sheet>
  );
}
