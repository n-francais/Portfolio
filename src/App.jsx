import { useEffect } from "react";
import Landing from "./components/Landing";
import ThemeToggle from "./components/ThemeToggle";
import About from "./components/About";
import Projects from "./components/Projects";
import Program from "./components/Program";
import Parcours from "./components/Parcours";
import HorsCode from "./components/HorsCode";
import Contact from "./components/Contact";
import useHashRoute from "./hooks/useHashRoute";
import navItems from "./data/navItems";

const SECTIONS = {
  apropos: About,
  projets: Projects,
  competences: Program,
  parcours: Parcours,
  horscode: HorsCode,
  contact: Contact,
};

function App() {
  const active = useHashRoute();
  const ActiveSection = active ? SECTIONS[active] : null;

  useEffect(() => {
    if (!ActiveSection) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") window.location.hash = "";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ActiveSection]);

  if (!ActiveSection) {
    return <Landing />;
  }

  const accent = navItems.find((item) => item.id === active)?.color;

  return (
    <div className="page" style={{ "--accent": accent }}>
      <ThemeToggle />
      <a href="#" className="back-link">
        ← Carte mentale
      </a>
      <main className="main">
        <ActiveSection />
      </main>
    </div>
  );
}

export default App;
