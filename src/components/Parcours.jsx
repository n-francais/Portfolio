import Sheet from "./Sheet";
import semesters from "../data/semesters";
import timeline from "../data/timeline";

export default function Parcours() {
  return (
    <Sheet title="Parcours" lead="Ma formation et mes expériences, du bac à la suite envisagée.">
      <div className="two">
        <section>
          <h3>Programme du BUT</h3>
          {semesters.map((s) => (
            <article key={s.code} className={`card sem${s.now ? " now" : ""}`}>
              <span className="code">
                {s.code}
                {s.now && <span className="badge">En cours</span>}
              </span>
              <p style={{ margin: ".2rem 0 0" }}>{s.text}</p>
              {s.note && <p className="note">{s.note}</p>}
            </article>
          ))}
        </section>
        <section>
          <h3>Chronologie</h3>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.title} className={t.next ? "next" : undefined}>
                <span className="yr">{t.year}</span>
                <b>{t.title}</b>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </Sheet>
  );
}
