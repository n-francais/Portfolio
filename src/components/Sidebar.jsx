import useActiveSection from "../hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "apropos", label: "À propos" },
  { id: "projets", label: "Projets" },
  { id: "competences", label: "Programme et compétences" },
  { id: "parcours", label: "Parcours" },
  { id: "horscode", label: "Hors code" },
  { id: "contact", label: "Contact" },
];

export default function Sidebar() {
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));

  return (
    <aside className="side">
      <ThemeToggle />
      <div>
        <h1 className="name">
          <span>Nina</span>
          <span>Français</span>
        </h1>
        <p className="role">
          Développeuse full-stack en alternance chez Legrand, 3<sup>e</sup> année de BUT
          Informatique à l'IUT du Limousin
        </p>
      </div>

      <div className="status">
        <div>
          <strong>Rentrée 2027</strong>
          Je cherche une école d'ingénieur en apprentissage pour poursuivre après mon BUT.
        </div>
      </div>

      <nav aria-label="Sections">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} aria-current={activeId === item.id || undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="contact">
        <a href="mailto:ninafran67@gmail.com">ninafran67@gmail.com</a>
        <a href="tel:+33699119604">+33 6 99 11 96 04</a>
        <a href="https://www.linkedin.com/in/nina-fran%C3%A7ais" target="_blank" rel="noopener">
          LinkedIn
        </a>
        <span>Limoges · permis B</span>
      </div>
    </aside>
  );
}
