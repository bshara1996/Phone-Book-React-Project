import classes from "./form.module.css";
import { useState } from "react";
import { users } from "../../../app/data/users";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Button from "../../controls/button/Button";

/**
 * Login Form Component that Handles user authentication against the users data
 *
 * @param {Function} onLoginSuccess - Called with user data on successful login
 * @returns {JSX.Element} A form with username, password fields and validation
 */
export default function Form({ onLoginSuccess }) {
  // Form field values and error state management
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirm: false,
  });

  /**
   * Handles input changes and clears existing errors
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleInput = ({ target: { name, value } }) => {
    setError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission and user authentication
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      setError("Passwords do not match");
      return;
    }

    const user = users.find(
      (u) =>
        u.username === formData.username && u.password === formData.password
    );
    user
      ? onLoginSuccess({ ...user, password: undefined })
      : setError("Invalid credentials");
  };

  /**
   * Renders an input field with optional password visibility toggle
   * @param {string} name - The name and id of the input field
   * @param {string} [type="text"] - The type of the input field
   * @param {string} placeholder - The placeholder and label for the input field
   * @returns {JSX.Element} The rendered input field
   */
  const renderInput = (name, type = "text", placeholder) => (
    <div
      className={
        classes[type === "password" ? "passwordContainer" : "formGroup"]
      }
    >
      <input
        type={
          type === "password"
            ? showPasswords[name]
              ? "text"
              : "password"
            : type
        }
        name={name}
        id={name}
        value={formData[name]}
        onChange={handleInput}
        placeholder={placeholder}
        required
        pattern={name === "username" ? "^[a-zA-Z0-9_]{3,}$" : ".+"}
        autoComplete={name === "username" ? "username" : "new-password"}
      />
      {/* Show password toggle button only for password fields */}
      {type === "password" && (
        <button
          type="button"
          onClick={() =>
            setShowPasswords((prev) => ({ ...prev, [name]: !prev[name] }))
          }
          className={classes.passwordToggle}
          tabIndex={-1}
        >
          {showPasswords[name] ? <HiOutlineEyeOff /> : <HiOutlineEye />}
        </button>
      )}
      {/* Floating label for input fields */}
      <label htmlFor={name} className={classes.floatingLabel}>
        {placeholder}
      </label>
    </div>
  );

  return (
    <div>
      <h2 className={classes.loginTitle}>Login</h2>

      {/* Display error message if any */}
      {error && <p className={classes.errorMessage}>{error}</p>}

      {/* Form for user login */}
      <form onSubmit={handleSubmit} className={classes.form}>
        {renderInput("username", "text", "Username")}
        {renderInput("password", "password", "Password")}
        {renderInput("confirm", "password", "Confirm Password")}
        <Button className={classes.passwordBtn} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
