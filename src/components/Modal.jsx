import React from "react";
import "../styles/Modal.css";

/**
 * Component Modal - Fenêtre pop-up modal
 * @param {Object} props
 * @param {boolean} props.isOpen - Détermine si le modal est ouvert
 * @param {Function} props.onClose - Callback pour fermer le modal
 * @param {string} props.title - Titre du modal
 * @param {React.ReactNode} props.children - Contenu du modal
 */
// eslint-disable-next-line react/prop-types
function Modal({ isOpen, onClose, title, children }) {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal-overlay"
        onClick={handleOverlayClick}
        onKeyDown={handleKeyDown}
        role="none"
      ></div>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            type="button"
          >
            ×
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
}

export default Modal;
