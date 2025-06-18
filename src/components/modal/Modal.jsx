import { HiX } from "react-icons/hi";
import classes from "./modal.module.css";

/**
 * A reusable modal component for displaying content in a popup box.
 * @param {string} title - Header text shown at the top of modal
 * @param {ReactNode} children - Content to be displayed in the modal body
 * @param {Function} onClose - Called when modal should close (x/button/backdrop click)
 * @returns {JSX.Element} Modal component with title, content and close functionality
 */
export default function Modal({ title, children, onClose }) {
  // Handler for clicks on the backdrop (outside modal)
  const handleBackdropClick = (event) => {
    // Only close if clicking the backdrop itself, not modal content
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classes.backdrop} onClick={handleBackdropClick}>
      <div className={classes.modal}>
        {/* Modal header with title and close button */}
        <div className={classes.header}>
          <h2 className={classes.title}>{title}</h2>
          <button
            className={classes.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <HiX />
          </button>
        </div>
        {/* Modal content */}
        {children}
      </div>
    </div>
  );
}
