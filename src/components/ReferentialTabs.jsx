import { useRef, useState } from "react";
import referentiel from "../data/referentiel";

export default function ReferentialTabs() {
  const [activeId, setActiveId] = useState(referentiel[0].id);
  const tabRefs = useRef([]);

  const handleKeyDown = (e, index) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const nextIndex = (index + delta + referentiel.length) % referentiel.length;
    setActiveId(referentiel[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  const active = referentiel.find((comp) => comp.id === activeId);

  return (
    <>
      <div className="ref-tabs" role="tablist" aria-label="Les six compétences">
        {referentiel.map((comp, index) => (
          <button
            key={comp.id}
            ref={(el) => (tabRefs.current[index] = el)}
            role="tab"
            id={`tab-${comp.id}`}
            aria-controls={`pan-${comp.id}`}
            aria-selected={activeId === comp.id}
            tabIndex={activeId === comp.id ? 0 : -1}
            style={{ "--c": comp.color }}
            onClick={() => setActiveId(comp.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <span>{comp.title}</span>
            <small>{comp.level}</small>
          </button>
        ))}
      </div>

      {referentiel.map((comp) => (
        <article
          key={comp.id}
          className="ref"
          role="tabpanel"
          id={`pan-${comp.id}`}
          aria-labelledby={`tab-${comp.id}`}
          style={{ "--c": comp.color }}
          hidden={activeId !== comp.id}
        >
          <header className="ref-head">
            <h3>{comp.title}</h3>
            <p>{comp.description}</p>
          </header>
          <div className="ref-cols">
            <div>
              <h4>Composantes essentielles</h4>
              <ul>
                {comp.essentials.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Situations professionnelles</h4>
              <ul>
                {comp.situations.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <h4 className="ref-lv-title">Niveaux de développement et apprentissages critiques</h4>
          <div className="levels">
            {comp.levels.map((level, levelIndex) => (
              <section
                key={level.title}
                className={`lv lv${levelIndex + 1}`}
                aria-label={`Niveau ${levelIndex + 1}`}
              >
                <div className="lv-head">
                  <b>Niveau {levelIndex + 1}</b>
                  <span>{level.title}</span>
                </div>
                <ul className="ac">
                  {level.acs.map((ac) => (
                    <li key={ac.code} className={ac.status || ""}>
                      <code>{ac.code}</code>
                      <div>
                        <span>{ac.label}</span>
                        {ac.evidence && <p className="ev">{ac.evidence}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </article>
      ))}
    </>
  );
}
