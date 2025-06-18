import { HiOutlineStar, HiStar } from "react-icons/hi";
import classes from "./favoriteButton.module.css";

/**
 * FavoriteButton component for toggling favorite status
 * @param {boolean} isFavorite - Whether the contact item is considered favorite
 * @param {Function} onClick - Click handler function
 * @returns {JSX.Element} FavoriteButton component
 */
export default function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button
      className={`${classes.favoriteButton} ${
        isFavorite ? classes.active : ""
      }`}
      onClick={onClick}
    >
      {isFavorite ? (
        <HiStar className={classes.icon} />
      ) : (
        <HiOutlineStar className={classes.icon} />
      )}
    </button>
  );
}
