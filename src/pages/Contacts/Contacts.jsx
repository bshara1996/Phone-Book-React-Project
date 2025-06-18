import ContactsList from "../../components/contactsList/ContactsList";
import pageClasses from "../page.module.css";
import classes from "./contacts.module.css";

/**
 * Contacts page component that displays the full list of contacts
 * Shows additional admin controls if the user has admin privileges
 *
 * @param {Object} user - Current user data for access control
 * @param {string} user.role - User's role ('admin' or 'user')
 * @returns {JSX.Element} A page component with contacts list and admin controls
 */
export default function Contacts({ user }) {
  // Determine if user has admin privileges
  const isAdmin = user?.role === "admin";

  return (
    <div className={pageClasses.page}>
      <main>
        <div className={classes.pageHeader}>
          <h2 className={classes.title}>All Contacts</h2>
        </div>
        <ContactsList isAdmin={isAdmin} />
      </main>
    </div>
  );
}
