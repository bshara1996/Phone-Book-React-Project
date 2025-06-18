import React from "react";
import classes from "./homeCard.module.css";

/**
 * Card component for the home page featuring an icon, title and description.
 *
 * @param {React.ComponentType} icon - Icon component
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @returns {JSX.Element} A styled card with an icon, title, and description text
 */
export default function HomeCard({ icon: Icon, title, description }) {
  return (
    <div className={classes.card}>
      <div className={classes.iconContainer}>
        <Icon className={classes.icon} />
      </div>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.description}>{description}</p>
    </div>
  );
}
