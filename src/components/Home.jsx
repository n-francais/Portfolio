import { forwardRef } from "react";
import { Chips } from "./Sheet";

const SKILLS = ["TypeScript", "NestJS", "Flutter", "Java", "Python", "SQL", "Azure DevOps", "Scrum"];
const INTERESTS = ["Rugby", "Handball", "Orchestre", "Arts plastiques"];

// L'accueil reprend la maquette : le nom en grand, puis l'essentiel du profil.
const Home = forwardRef(function Home(_, ref) {
  return (
    <div className="home-inner" ref={ref}>
      <p className="kicker">Portfolio</p>
      <h1 className="home-name">
        Nina
        <br />
        Français
      </h1>
      <p className="home-role">
        Développeuse full-stack en alternance chez Legrand, 3<sup>e</sup> année de BUT Informatique
        à l&apos;IUT du Limousin.
      </p>
      <p className="home-pitch">
        Je conçois et développe des applications et des API (NestJS, Flutter). Ce qui me motive le
        plus : faire avancer un projet en équipe, du besoin à la livraison.
      </p>
      <p className="label">Compétences</p>
      <Chips items={SKILLS} />
      <p className="label">Centres d&apos;intérêt</p>
      <Chips items={INTERESTS} />
      <div className="goal">
        <div>
          <strong>Objectif professionnel</strong>
          Rentrée 2027 : école d&apos;ingénieur ou master pour me spécialiser en management et
          gestion de projet informatique, idéalement en alternance.
        </div>
      </div>
    </div>
  );
});

export default Home;
