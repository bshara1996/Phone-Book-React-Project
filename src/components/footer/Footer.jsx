import classes from "./footer.module.css";

/**
 * Footer component displays copyright information
 * @returns {JSX.Element} Footer with current year and authors
 */
export default function Footer() {
  // Get current year for copyright
  const date = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <p>&copy; {date} Bshara Krakaby & Moner Makholy</p>
    </footer>
  );
}
