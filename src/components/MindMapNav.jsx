const CENTER = 50;
const RADIUS = 38;

function nodePosition(index, count) {
  const angle = (-90 + index * (360 / count)) * (Math.PI / 180);
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

export default function MindMapNav({ items, activeId }) {
  const nodes = items.map((item, i) => ({ ...item, ...nodePosition(i, items.length) }));

  return (
    <nav className="mindmap" aria-label="Sections">
      <svg viewBox="0 0 100 100" className="mindmap-lines" aria-hidden="true">
        {nodes.map((n) => (
          <line
            key={n.id}
            x1={CENTER}
            y1={CENTER}
            x2={n.x}
            y2={n.y}
            className={activeId === n.id ? "active" : ""}
          />
        ))}
      </svg>

      <a href="#apropos" className="mindmap-hub" aria-label="Aller en haut de page">
        NF
      </a>

      {nodes.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          className="mindmap-node"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          aria-current={activeId === n.id || undefined}
          title={n.label}
        >
          {n.short}
        </a>
      ))}
    </nav>
  );
}
