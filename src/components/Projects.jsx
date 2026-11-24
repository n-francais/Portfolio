import Sheet, { Chips } from "./Sheet";
import projects from "../data/projects";

// Les projets à la une d'abord.
const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

export default function Projects() {
  return (
    <Sheet title="Projets" lead="Alternance chez Legrand, SAÉ du BUT et projets de cours.">
      <div className="grid">
        {ordered.map((p) => (
          <article key={p.title} className={`card${p.featured ? " featured" : ""}`}>
            <p className="meta">
              <b>{p.org}</b>
              {(p.meta || []).map((m) => (
                <span key={m}>{m}</span>
              ))}
            </p>
            <h3>{p.title}</h3>
            {p.context && <p className="ctx">{p.context}</p>}
            {p.bullets?.length > 0 && (
              <ul className="bul">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {p.tags?.length > 0 && <Chips items={p.tags} />}
          </article>
        ))}
      </div>
    </Sheet>
  );
}
