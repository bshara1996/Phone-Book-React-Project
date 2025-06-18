import { HiOutlineSearch } from "react-icons/hi";
import classes from "./search.module.css";

/**
 * Search component for filtering contacts
 * @param {string} value - Current search value
 * @param {Function} onChange - Callback function that receives the search text
 * @returns {JSX.Element} Search input for filtering contacts with icon
 */
export default function Search({ value, onChange }) {
  return (
    <div className={classes.searchWrapper}>
      <HiOutlineSearch className={classes.searchIcon} />
      <input
        type="text"
        className={classes.searchInput}
        placeholder="Search contacts..."
        value={value}
        // Pass the input value to parent component's onChange handler
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
