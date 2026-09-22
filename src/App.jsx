import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Projects from "./components/Projects";
import Program from "./components/Program";
import Parcours from "./components/Parcours";
import HorsCode from "./components/HorsCode";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <About />
        <Projects />
        <Program />
        <Parcours />
        <HorsCode />
        <Contact />
      </main>
    </div>
  );
}

export default App;
