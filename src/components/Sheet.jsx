// Mise en page commune des onglets : titre, phrase d'introduction, contenu.
export default function Sheet({ title, lead, children }) {
  return (
    <>
      <h2 className="sheet-title">{title}</h2>
      {lead && <p className="sheet-lead">{lead}</p>}
      <div className="sheet-body">{children}</div>
    </>
  );
}

export function Chips({ items }) {
  return (
    <ul className="chips">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
