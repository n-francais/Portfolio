/* « Le repas équitable » : garde tous les poissons rassasiés pendant 60 secondes.
   Ce module ne contient que les règles (états, faim, score) ; le moteur s'occupe des poissons, du
   dessin et des événements (nourriture mangée, volée, poisson étourdi). Il n'a aucune dépendance. */

export const DURATION = 60; // secondes de jeu
const READY_S = 1.4; // « Prêt ? » avant le départ
const START_HUNGER = 0.8;
const BASE_DECAY = 0.025; // la faim baisse de 2,5 % par seconde au début…
const RAMP = 1.2; // …et plus de deux fois plus vite à la fin
const PELLET_FILL = 0.3; // une granule remplit 30 % de la jauge de faim
const GREEN = 0.4; // au-dessus : rassasié ; sous RED : affamé
const RED = 0.2;
const PERFECT_BONUS = 200;
const BEST_KEY = "reef-best-score";

function loadBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}
function saveBest(v) {
  try {
    localStorage.setItem(BEST_KEY, String(v));
  } catch {
    // stockage indisponible : le record ne vaut que pour cette visite
  }
}

export const zone = (h) => (h >= GREEN ? "green" : h >= RED ? "orange" : "red");

export function createGame({ onChange }) {
  let phase = "idle"; // idle → ready → playing → over
  let ready = 0, left = DURATION, score = 0, best = loadBest(), perfect = true, newRecord = false;
  let hunger = [], appetite = [], last = "";

  const snapshot = () => ({
    phase, time: Math.ceil(Math.max(0, left)), score: Math.floor(score), best, perfect, newRecord,
  });
  function emit(force) {
    const snap = snapshot(), key = `${snap.phase}|${snap.time}|${snap.score}|${snap.best}|${snap.perfect}|${snap.newRecord}`;
    if (!force && key === last) return;
    last = key;
    onChange?.(snap);
  }

  return {
    get phase() { return phase; },
    get hunger() { return hunger; },
    get active() { return phase === "ready" || phase === "playing"; },
    get playing() { return phase === "playing"; },
    get timeLeft() { return left; },

    // `appetites` : un coefficient de gourmandise par poisson.
    start(appetites) {
      appetite = appetites;
      hunger = appetites.map(() => START_HUNGER);
      phase = "ready"; ready = READY_S; left = DURATION; score = 0; perfect = true; newRecord = false;
      emit(true);
    },
    stop() {
      phase = "idle";
      emit(true);
    },

    update(dt) {
      if (phase === "ready") {
        if ((ready -= dt) <= 0) { phase = "playing"; emit(true); }
        return;
      }
      if (phase !== "playing") return;
      const elapsed = DURATION - left, decay = BASE_DECAY * (1 + RAMP * (elapsed / DURATION));
      for (let i = 0; i < hunger.length; i++) {
        hunger[i] = Math.max(0, hunger[i] - decay * appetite[i] * dt);
        const z = zone(hunger[i]);
        // Points : toute la durée où un poisson est rassasié (et un peu s'il est à moitié affamé).
        if (z === "green") score += 10 * dt; else if (z === "orange") score += 3 * dt;
        if (hunger[i] <= 0.02) perfect = false;
      }
      if ((left -= dt) <= 0) {
        left = 0;
        phase = "over";
        if (perfect) score += PERFECT_BONUS;
        if (score > best) { best = Math.floor(score); newRecord = true; saveBest(best); }
        emit(true);
        return;
      }
      emit(false);
    },

    feed(i, amount = PELLET_FILL) {
      if (hunger[i] !== undefined) hunger[i] = Math.min(1, hunger[i] + amount);
    },
  };
}
