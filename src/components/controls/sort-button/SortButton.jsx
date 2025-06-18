import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import classes from "./sortButton.module.css";

/**
 * SortButton component for sorting contacts
 * @param {string} currentKey - Currently active sort field
 * @param {string} sortKey - This button's sort field (e.g., 'name', 'email')
 * @param {'asc' | 'desc'} direction - Current sort direction
 * @param {Function} onSort - Called with sortKey when button is clicked
 * @param {string} label - Button display text
 * @returns {JSX.Element} Button with sort direction indicator when active
 */
export default function SortButton({
  currentKey,
  sortKey,
  direction,
  onSort,
  label,
}) {
  // Determine if this button's sort field is currently active
  const isActive = currentKey === sortKey;

  return (
    <button
      className={`${classes.sortButton} ${isActive ? classes.active : ""}`}
      // Trigger sort with this button's sort field when clicked
      onClick={() => onSort(sortKey)}
      aria-label={`Sort by ${label}`}
    >
      <span>{label}</span>
      {/* Show sort direction icon only when this field is active */}
      {isActive &&
        (direction === "asc" ? (
          <HiSortAscending className={classes.icon} />
        ) : (
          <HiSortDescending className={classes.icon} />
        ))}
    </button>
  );
}
