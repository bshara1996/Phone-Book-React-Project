import { HiPlus } from "react-icons/hi";
import classes from "./addButton.module.css";

/**
 * AddButton component for adding new contact
 * @param {Function} onClick - Called when button is clicked
 * @param {string} [label=Add New] - Button text
 * @returns {JSX.Element} AddButton component
 *
 */
export default function AddButton({ onClick, label = "Add New" }) {
  return (
    <button className={classes.addButton} onClick={onClick} aria-label={label}>
      <HiPlus className={classes.icon} />
      <span>{label}</span>
    </button>
  );
}
