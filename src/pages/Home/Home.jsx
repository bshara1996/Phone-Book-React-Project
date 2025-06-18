import { useState, useEffect } from "react";
import Card from "../../components/cards/homeCard/HomeCard";
import { cards } from "../../app/data/cards";

import classes from "./home.module.css";
import pageClasses from "../page.module.css";

/**
 * Landing page with animated welcome message and feature cards.
 *
 * @param {Object} user - User data containing name
 * @returns {JSX.Element} A page with animated welcome text and a grid of feature cards
 */
export default function Home({ user }) {
  // Stores the current state of the animated welcome text
  const [welcomeText, setWelcomeText] = useState("");
  const fullText = `Welcome ${user.name}!`;

  // Creates a typewriter effect by adding one character every 100ms
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setWelcomeText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [fullText]); // Re-run if fullText changes

  return (
    <div className={pageClasses.page}>
      <main className={classes.main}>
        {/* Welcome section with animated text */}
        <div className={classes.welcomeSection}>
          <h2>{welcomeText}</h2>
          <p>
            Manage your contacts efficiently with our modern and intuitive
            contact management system
          </p>
        </div>

        {/* Feature cards grid layout */}
        <div className={classes.cardsContainer}>
          {cards.map((card) => (
            <div key={crypto.randomUUID()}>
              <Card
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
