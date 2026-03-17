export default function Skills() {
  const skillCategories = [
    {
      category: "Langages",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "C", "C++", "PHP"],
    },
    {
      category: "Frontend",
      skills: ["HTML5", "CSS3", "Vue.js", "Figma"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "SQL", "PostgreSQL", "MySQL", "SQL Server"],
    },
    {
      category: "DevOps & Outils",
      skills: ["Git/GitHub", "Linux", "VS Code", "Azure DevOps"],
    },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>Compétences</h2>
        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="skill-category">
              <h3>{cat.category}</h3>
              <div className="skills-list">
                {cat.skills.map((skill, i) => (
                  <span key={i} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
