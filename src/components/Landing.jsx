import ThemeToggle from "./ThemeToggle";
import MindMapNav from "./MindMapNav";
import navItems from "../data/navItems";

export default function Landing() {
  return (
    <div className="landing">
      <ThemeToggle />
      <p className="lead">Clique sur un élément de la carte pour explorer mon profil.</p>
      <MindMapNav items={navItems} />
    </div>
  );
}
