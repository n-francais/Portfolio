import timeline from "../data/timeline";
import { TIMELINE_ICONS } from "./icons";

export default function Parcours() {
  return (
    <section id="parcours">
      <h2>Parcours</h2>
      <ol className="timeline">
        {timeline.map((item, i) => {
          const Icon = TIMELINE_ICONS[item.icon];
          return (
            <li key={i} className={item.next ? "next" : ""}>
              <time>{item.year}</time>
              <span className="timeline-icon">{Icon && <Icon />}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
