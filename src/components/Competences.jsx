import Sheet, { Chips } from "./Sheet";
import referentiel from "../data/referentiel";
import stack from "../data/stack";

export default function Competences() {
  return (
    <Sheet
      title="Compétences"
      lead="Les six compétences du BUT, avec ce que j'ai déjà mis en œuvre et ce que je vise."
    >
      <dl className="stack">
        {stack.map((s) => (
          <div className="stack-row" key={s.label}>
            <dt>{s.label}</dt>
            <dd>
              <Chips items={s.value.split(",").map((v) => v.trim())} />
            </dd>
          </div>
        ))}
      </dl>
      <div className="legend">
        <span>
          <i className="dot" />
          Mis en œuvre dans mes projets
        </span>
        <span>
          <i className="dot todo" />
          Objectif en cours
        </span>
      </div>
      {referentiel.map((c, i) => (
        <details className="comp" key={c.id} open={i === 0}>
          <summary>
            <span className="comp-swatch" style={{ background: c.color }} />
            <span className="comp-title">{c.title}</span>
            <span className="comp-level">{c.level}</span>
          </summary>
          <div className="comp-body">
            <p style={{ color: "var(--soft)" }}>{c.description}</p>
            <h3>L&apos;essentiel</h3>
            <ul className="plain">
              {c.essentials.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <h3>Situations professionnelles</h3>
            <ul className="plain">
              {c.situations.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            {c.levels.map((l, n) => (
              <div className="lvl" key={l.title}>
                <h4>{`Niveau ${n + 1} — ${l.title}`}</h4>
                {l.acs.map((ac) => {
                  const done = ac.status === "done";
                  return (
                    <div className={`ac${done ? "" : " todo"}`} key={ac.code}>
                      <code>{ac.code}</code>
                      <span>
                        <i className={`dot${done ? "" : " todo"}`} />
                        {ac.label}
                      </span>
                      <span className="ev">{ac.evidence}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </details>
      ))}
    </Sheet>
  );
}
