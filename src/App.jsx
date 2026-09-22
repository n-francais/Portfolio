import Sidebar from "./components/Sidebar";
import Landing from "./components/Landing";
import About from "./components/About";
import Projects from "./components/Projects";
import Program from "./components/Program";
import Parcours from "./components/Parcours";
import HorsCode from "./components/HorsCode";
import Contact from "./components/Contact";
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

  if (!ActiveSection) {
    return <Landing />;
  }

  return (
    <div className="shell">
      <Sidebar active={active} />
      <main className="main">
        <ActiveSection />
      </main>
    </div>
  );
}

export default App;
