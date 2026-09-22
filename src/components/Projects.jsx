import projects from "../data/projects";

export default function Projects() {
  return (
    <section id="projets">
      <h2>Projets</h2>

      {projects.map((project) => (
        <article
          key={project.title}
          className={`project${project.featured ? " feature" : ""}`}
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
