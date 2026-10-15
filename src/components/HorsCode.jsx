import hobbies from "../data/hobbies";

export default function HorsCode() {
  return (
    <section id="horscode">
      <h2>Hors code</h2>
      <p className="lead">
        En dehors du code, la musique, l'art et le sport rythment mon quotidien.
      </p>
      <div className="life">
        {hobbies.map((hobby) => (
          <div key={hobby.title}>
            <h3>{hobby.title}</h3>
            <p>{hobby.intro}</p>
            <ul>
              {hobby.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
