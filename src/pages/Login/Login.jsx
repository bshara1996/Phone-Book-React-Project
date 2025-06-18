import { useNavigate } from "react-router-dom";
import { users } from "../../app/data/users";
import { usePhoneBook } from "../../context/PhoneBookContext";

import LoginForm from "../../components/forms/loginForm/LoginForm";

import pageClasses from "../page.module.css";
import classes from "./login.module.css";

/**
 * Login page component that handles user authentication
 * @param {Function} onLogin - Callback function to update authentication state in parent component
 * @returns {JSX.Element} Login page with form and test account information
 */
export default function Login({ onLogin }) {
  // Hook for programmatic navigation after successful login
  const navigate = useNavigate();
  const { resetAllData } = usePhoneBook();

  /**
   * Handles successful login attempt
   * @param {Object} userData - User data received from login form
   * @param {string} userData.username - The username of the logged-in user
   * @param {string} userData.role - The role/permissions of the logged-in user
   */
  async function handleLoginSuccess(userData) {
    // Update global auth state with user data and set authenticated flag
    onLogin({ ...userData, isAuthenticated: true });
    // Reset all data and fetch fresh data
    await resetAllData();
    // Redirect to home page after successful login
    navigate("/home");
  }

  return (
    <div className={pageClasses.page}>
      <main>
        {/* Main container for login form and test accounts */}
        <div className={classes.loginContainer}>
          {/* Login form component with success callback */}
          <LoginForm onLoginSuccess={handleLoginSuccess} />

          {/* Test accounts section for development/testing */}
          <div className={classes.testAccountsContainer}>
            <p>Available test accounts:</p>

            {/* Map through available test users */}
            {users.map((account) => (
              <div className={classes.accountItem} key={crypto.randomUUID()}>
                Username: <b>{account.username}</b> | Password:{" "}
                <b>{account.password}</b> | Role: <b>{account.role}</b>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
