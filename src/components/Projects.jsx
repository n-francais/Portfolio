import projects from "../data/projects";
import useTilt from "../hooks/useTilt";

export default function Projects() {
  const tilt = useTilt();

  return (
    <section id="projets">
      <h2>Projets</h2>

      {projects.map((project) => (
        <article
          key={project.title}
          className={`project${project.featured ? " feature" : ""}`}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
        >
          <div className="p-meta">
            <b>{project.org}</b>
            {project.meta.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </div>
          <div>
            <h3>{project.title}</h3>
            <p className="ctx">{project.context}</p>
            <ul>
              {project.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
            {project.tags.length > 0 && (
              <ul className="tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
