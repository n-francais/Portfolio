// Masque le texte pour ne garder que l'aquarium, ou le rétablit.
export default function AquariumToggle({ active, onToggle }) {
  const label = active ? "Afficher le texte" : "Masquer le texte pour voir l'aquarium";
  return (
    <button type="button" className="round-btn aquarium-toggle" onClick={onToggle} aria-pressed={active} aria-label={label} title={label}>
      {active ? (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.8" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 3l18 18" />
          <path d="M10.6 5.6A10.9 10.9 0 0 1 12 5.5c6.4 0 10 6.5 10 6.5a17.6 17.6 0 0 1-3.1 3.9M6.5 7.1A17.4 17.4 0 0 0 2 12s3.6 6.5 10 6.5a10 10 0 0 0 4.2-.9" />
          <path d="M9.9 9.9a2.8 2.8 0 0 0 4 4" />
        </svg>
      )}
    </button>
  );
}
