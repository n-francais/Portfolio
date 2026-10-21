import { useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import MindMapNav from "./MindMapNav";
import navItems from "../data/navItems";

const SKILLS = ["TypeScript", "NestJS", "Flutter", "Java", "Python", "SQL", "Azure DevOps", "Scrum"];
const INTERESTS = ["Rugby", "Handball", "Orchestre", "Arts plastiques"];

export default function Landing() {
  const ref = useRef(null);

  const handlePointerMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div className="landing" ref={ref} onPointerMove={handlePointerMove}>
      <ThemeToggle />
      <div className="landing-grid">
        <section className="intro" aria-label="Présentation">
          <p className="intro-kicker">Portfolio</p>
          <h1>Nina Français</h1>
          <p className="intro-role">
            Développeuse full-stack en alternance chez Legrand, 3<sup>e</sup> année de BUT
            Informatique à l'IUT du Limousin.
          </p>
          <p className="intro-text">
            Je conçois et développe des applications et des API (NestJS, Flutter). Ce qui me motive
            le plus : faire avancer un projet en équipe, du besoin à la livraison.
          </p>

          <div className="intro-block">
            <h2>Compétences</h2>
            <ul className="tags">
              {SKILLS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="intro-block">
            <h2>Centres d'intérêt</h2>
            <ul className="tags">
              {INTERESTS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="status intro-goal">
            <div>
              <strong>Objectif professionnel</strong>
              Rentrée 2027 : école d'ingénieur ou master pour me spécialiser en management et
              gestion de projet informatique, idéalement en alternance.
            </div>
          </div>
        </section>

        <div className="landing-map">
          <MindMapNav items={navItems} />
          <p className="lead">Clique sur un élément de la carte pour explorer mon profil.</p>
        </div>
      </div>
    </div>
  );
}
