import { useNavigate, NavLink } from "react-router-dom";

import { links } from "../../app/data/navLinks";
import classes from "./navbar.module.css";

/**
 * Navigation bar component that displays navigation links
 * @returns {JSX.Element} - navigation bar component with dynamic links
 */
export default function Navbar() {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Handles logout by redirecting to login page
   * Navigation guard in Layout will handle auth state
   */
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className={classes.navbar}>
      <ul>
        {/* Map through navigation links from data file */}
        {links.map((el) => (
          <li key={crypto.randomUUID()}>
            <NavLink
              to={el.link}
              className={({ isActive }) =>
                //  Apply active class conditionally based on current route
                `${classes.navLink} ${isActive ? classes.active : ""}`
              }
              onClick={el.name === "Logout" ? handleLogout : undefined}
            >
              {el.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
