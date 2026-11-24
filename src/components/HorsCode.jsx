import Sheet from "./Sheet";
import hobbies from "../data/hobbies";

export default function HorsCode() {
  return (
    <Sheet title="Hors code" lead="Ce qui m'occupe quand je ne programme pas.">
      <div className="grid">
        {hobbies.map((x) => (
          <article key={x.title} className="card">
            <h3>{x.title}</h3>
            <p className="ctx">{x.intro}</p>
            <ul className="bul">
              {x.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Sheet>
  );
}
