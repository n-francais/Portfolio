import timeline from "../data/timeline";

export default function Parcours() {
  return (
    <section id="parcours">
      <h2>Parcours</h2>
      <ol className="timeline">
        {timeline.map((item, i) => (
          <li key={i} className={item.next ? "next" : ""}>
            <time>{item.year}</time>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
