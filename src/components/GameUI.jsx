// Interface du jeu « Le repas équitable » : bouton Jouer, compteur, « Prêt ? » et écran de fin.
// Le moteur envoie l'état de la partie (environ une fois par seconde) ; la jauge de nourriture,
// elle, est mise à jour directement par le moteur.

export function PlayButton({ onStart }) {
  return (
    <button type="button" className="play" onClick={onStart}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l11-6.8a1 1 0 0 0 0-1.72l-11-6.8A1 1 0 0 0 8 5.2Z" />
      </svg>
      Jouer
    </button>
  );
}

export function GameHud({ game, onStop }) {
  if (game.phase !== "ready" && game.phase !== "playing") return null;
  return (
    <>
      <div className="hud" role="group" aria-label="Partie en cours">
        <span className="hud-time">{game.time}<small> s</small></span>
        <span className="hud-score">{game.score}<small> pts</small></span>
        <button type="button" className="hud-stop" onClick={onStop} aria-label="Arrêter la partie" title="Arrêter la partie (Échap)">
          ✕
        </button>
      </div>
      {game.phase === "ready" && (
        <div className="ready" role="status">
          <b>Prêt ?</b>
          <span>Garde tous les poissons rassasiés. Attention au koï glouton, à la pieuvre et aux méduses.</span>
        </div>
      )}
    </>
  );
}

export function GameOver({ game, onRestart, onQuit }) {
  if (game.phase !== "over") return null;
  return (
    <div className="over" role="dialog" aria-modal="true" aria-label="Partie terminée">
      <div className="over-card">
        <h2>Partie terminée</h2>
        <p className="over-score">{game.score}<small> points</small></p>
        {game.perfect && <p className="over-note">Série parfaite : personne n&apos;a jamais été affamé (+200)</p>}
        <p className="over-best">{game.newRecord ? "Nouveau record !" : `Meilleur score : ${game.best}`}</p>
        <div className="over-actions">
          <button type="button" className="btn primary" onClick={onRestart} autoFocus>Rejouer</button>
          <button type="button" className="btn" onClick={onQuit}>Quitter</button>
        </div>
      </div>
    </div>
  );
}
