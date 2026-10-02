import { useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import MindMapNav from "./MindMapNav";
import navItems from "../data/navItems";

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
      <p className="lead">Clique sur un élément de la carte pour explorer mon profil.</p>
      <MindMapNav items={navItems} />
    </div>
  );
}
