import React from "react";
import classes from "./button.module.css";

/**
 * Reusable button with style variants
 * @param {string} [className] - Additional CSS classes
 * @param {string} [variant=primary] - Style variant (primary, danger)
 * @param {React.ReactNode} children - Button content
 * @param {Function} onClick - Click event handler passed from parent
 * @param {string} [title] - Tooltip text
 * @param {Object} props - Additional button attributes
 * @returns {JSX.Element} Button component
 */
export default function Button({
  className = "",
  variant = "primary",
  children,
  onClick,
  title,
  ...props
}) {
  return (
    <button
      className={`${classes.button} ${classes[variant]} ${className}`}
      onClick={onClick}
      title={title}
      // Spread remaining props (type, disabled, etc.) to button element
      {...props}
    >
      {children}
    </button>
  );
}
