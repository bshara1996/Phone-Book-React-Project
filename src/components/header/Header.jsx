import classes from "./header.module.css";

/**
 * Header component displays the application title
 * @returns {JSX.Element} Header with "Phone Book" title
 */
export default function Header() {
  return (
    <header className={classes.header}>
      <h1>Phone Book</h1>
    </header>
  );
}
