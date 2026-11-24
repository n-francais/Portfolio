import { useCallback, useEffect, useRef, useState } from "react";
import Ocean from "./components/Ocean";
import ThemeToggle from "./components/ThemeToggle";
import AquariumToggle from "./components/AquariumToggle";
import FoodGauge from "./components/FoodGauge";
import ThemeTransition from "./components/ThemeTransition";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Competences from "./components/Competences";
import Parcours from "./components/Parcours";
import HorsCode from "./components/HorsCode";
import Contact from "./components/Contact";
import useHashRoute from "./hooks/useHashRoute";
import useTheme from "./hooks/useTheme";

const TABS = [
  { id: "accueil", label: "Accueil" },
  { id: "apropos", label: "À propos", Panel: About },
  { id: "projets", label: "Projets", Panel: Projects },
  { id: "competences", label: "Compétences", Panel: Competences },
  { id: "parcours", label: "Parcours", Panel: Parcours },
  { id: "horscode", label: "Hors code", Panel: HorsCode },
  { id: "contact", label: "Contact", Panel: Contact },
];

const go = (id) => { window.location.hash = id; };

function App() {
  const hash = useHashRoute();
  const [theme, toggleTheme, fx] = useTheme();
  const view = TABS.some((t) => t.id === hash) ? hash : "accueil";
  // Mode aquarium : le texte est masqué, on ne voit que les poissons, que l'on peut nourrir.
  const [aquarium, setAquarium] = useState(false);
  const gaugeRef = useRef(null);
  const homeRef = useRef(null);
  const panelRefs = useRef({});
  const tabRefs = useRef({});

  useEffect(() => {
    const tab = TABS.find((t) => t.id === view);
    document.title = view === "accueil" ? "Nina Français — Développeuse full-stack" : `${tab.label} — Nina Français`;
    if (panelRefs.current[view]) panelRefs.current[view].scrollTop = 0;
    tabRefs.current[view]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [view]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (aquarium) setAquarium(false);
      else if (window.location.hash.slice(1) !== "accueil") go("accueil");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [aquarium]);

  // Sur l'accueil, les poissons contournent le bloc de texte (sauf sur petit écran, où il couvre tout).
  const getAvoidRect = useCallback(() => {
    if (aquarium || view !== "accueil") return null;
    const r = homeRef.current?.getBoundingClientRect();
    return r && r.width < window.innerWidth * 0.7 ? r : null;
  }, [view, aquarium]);

  const onDockKey = (e) => {
    const i = TABS.findIndex((t) => t.id === view);
    const next = { ArrowRight: (i + 1) % TABS.length, ArrowLeft: (i - 1 + TABS.length) % TABS.length, Home: 0, End: TABS.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    go(TABS[next].id);
    tabRefs.current[TABS[next].id]?.focus();
  };

  return (
    <div className="app" data-view={view} data-aquarium={aquarium ? "" : undefined}>
      <Ocean getAvoidRect={getAvoidRect} theme={theme} fx={fx} aquarium={aquarium} gaugeRef={gaugeRef} />
      <div className="controls">
        <AquariumToggle active={aquarium} onToggle={() => setAquarium((on) => !on)} />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <FoodGauge ref={gaugeRef} />
      <ThemeTransition fx={fx} />

      <a className="brand" href="#accueil" aria-label="Nina Français, retour à l'accueil">
        Nina Français
      </a>

      <main className="stage" inert={aquarium ? "" : undefined}>
        {TABS.map(({ id, Panel }) => {
          const active = id === view;
          return (
            <section
              key={id}
              id={`panel-${id}`}
              ref={(el) => { panelRefs.current[id] = el; }}
              className={`view ${Panel ? "view--sheet" : "view--home"}${active ? " is-active" : ""}`}
              role="tabpanel"
              aria-labelledby={`tab-${id}`}
              aria-hidden={!active}
              inert={active ? undefined : ""}
              tabIndex={Panel ? 0 : undefined}
            >
              {Panel ? <Panel /> : <Home ref={homeRef} />}
            </section>
          );
        })}
      </main>

      <nav className="dock" role="tablist" aria-label="Sections du portfolio" onKeyDown={onDockKey} inert={aquarium ? "" : undefined}>
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            ref={(el) => { tabRefs.current[id] = el; }}
            type="button"
            className="tab"
            role="tab"
            id={`tab-${id}`}
            aria-controls={`panel-${id}`}
            aria-selected={id === view}
            tabIndex={id === view ? 0 : -1}
            onClick={() => go(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
