import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Projects from "./components/Projects";
import Program from "./components/Program";
import Parcours from "./components/Parcours";
import HorsCode from "./components/HorsCode";
import Contact from "./components/Contact";
import MindMapNav from "./components/MindMapNav";
import navItems from "./data/navItems";
import useHashRoute from "./hooks/useHashRoute";

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

  return (
    <div className="shell">
      <Sidebar active={active} />
      <main className="main">
        {ActiveSection ? (
          <ActiveSection />
        ) : (
          <section className="empty-state">
            <p className="lead">Clique sur un élément de la carte pour explorer mon profil.</p>
            <MindMapNav items={navItems} activeId={active} variant="hero" hubLabel="Nina Français" />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
