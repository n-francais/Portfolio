import { forwardRef } from "react";

// Jauge de nourriture du mode aquarium. Le moteur la met à jour directement (variable --food, compteur)
// pour éviter un rendu React à chaque image.
const FoodGauge = forwardRef(function FoodGauge(_, ref) {
  return (
    <div
      className="food"
      ref={ref}
      role="meter"
      aria-label="Nourriture restante"
      aria-valuemin={0}
      aria-valuemax={10}
      aria-valuenow={10}
    >
      <svg className="food-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12c3-5 8-6.5 12-4.5l4-2.5v14l-4-2.5C11 18.5 6 17 3 12Z" />
        <circle cx="8.2" cy="11" r=".9" fill="currentColor" stroke="none" />
      </svg>
      <div className="food-body">
        <span className="food-hint">
          <span className="food-hint-full">
            <span className="food-hint-click">Clique</span>
            <span className="food-hint-tap">Touche</span> l&apos;eau pour nourrir
          </span>
          <span className="food-hint-empty">Plus de nourriture, ça se recharge…</span>
        </span>
        <span className="food-bar">
          <span className="food-fill" />
        </span>
      </div>
      <span className="food-count">
        <b data-food-count>10</b>/10
      </span>
    </div>
  );
});

export default FoodGauge;
