import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Contacts from "../pages/Contacts/Contacts";
import Groups from "../pages/Groups/Groups";
import NotFound from "../pages/NotFound/NotFound";
import Layout from "./Layout";
import { PhoneBookProvider } from "../context/PhoneBookContext";
import classes from "./app.module.css";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

/**
 * Root component of the application
 * Handles routing, authentication state, and provides PhoneBook context
 *
 * @returns {JSX.Element} The main application with routing and authentication
 */
export default function App() {
  // Authentication state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  /**
   * Handles successful login
   * @param {Object} userData - User data from login form
   * @param {string} userData.username - User's username
   * @param {string} userData.role - User's role (admin/user)
   * @param {string} userData.name - User's display name
   */
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  /**
   * Handles user logout
   * Resets authentication state and user data
   */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <PhoneBookProvider>
        <section className={classes.app}>
          <Header />
          <Routes>
            {/* Login route */}
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            {/* Protected routes using Layout component */}
            <Route
              element={
                <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />
              }
            >
              <Route path="/home" element={<Home user={user} />} />
              <Route path="/contacts" element={<Contacts user={user} />} />
              <Route path="/groups" element={<Groups user={user} />} />
            </Route>

            {/* if nothing was found, show NotFound */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </section>
      </PhoneBookProvider>
    </Router>
  );
}
