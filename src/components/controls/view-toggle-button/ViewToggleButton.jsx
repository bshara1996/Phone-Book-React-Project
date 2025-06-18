import { HiViewList, HiViewGrid } from "react-icons/hi";
import classes from "./viewToggleButton.module.css";
import Button from "../button/Button";

/**
 * ViewToggleButton component for switching between full and compact views
 * @param {string} view - Current view mode ('full' or 'compact')
 * @param {Function} onToggle - Called when switching between view modes
 * @returns {JSX.Element} Button with view mode icon
 */
export default function ViewToggleButton({ view, onToggle }) {
  return (
    <Button
      className={classes.toggleButton}
      // Toggle between 'full' and 'compact' views when clicked
      onClick={() => onToggle(view === "full" ? "compact" : "full")}
      aria-label={`Switch to ${view === "full" ? "compact" : "full"} view`}
    >
      {/* Show List icon in full view, Grid icon in compact view */}
      {view === "full" ? (
        <HiViewList className={classes.icon} />
      ) : (
        <HiViewGrid className={classes.icon} />
      )}
    </Button>
  );
}
