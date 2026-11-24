// Bascule entre les profondeurs (sombre) et la surface (clair).
export default function ThemeToggle({ theme, onToggle }) {
  const toLight = theme === "dark";
  return (
    <button
      type="button"
      className="round-btn theme-toggle"
      onClick={onToggle}
      aria-label={toLight ? "Remonter à la surface (thème clair)" : "Plonger dans les profondeurs (thème sombre)"}
      title={toLight ? "Thème clair" : "Thème sombre"}
    >
      {toLight ? (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z" />
        </svg>
      )}
    </button>
  );
}
