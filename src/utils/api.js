/**
 * API utility functions for the phone book application
 * Handles all external API calls and data transformations
 */

/**
 * Fetch random contacts from the API and transform them to match our app's format
 * @param {number} count - Number of contacts to fetch
 * @param {string[]} groups - Available groups to assign randomly
 * @returns {Promise<Array>} Array of formatted contacts
 */
export const fetchRandomContacts = async (count = 10, groups = []) => {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }

    const { results } = await response.json();

    return results.map((user, index) => ({
      id: crypto.randomUUID(),
      name: `${user.name.first} ${user.name.last}`,
      phone: user.phone,
      email: user.email,
      image: `https://i.pravatar.cc/200?img=${index + 1}`,
      groups: [
        groups[Math.floor(Math.random() * groups.length)],
        groups[Math.floor(Math.random() * groups.length)],
      ].filter((group, index, self) => self.indexOf(group) === index), // Remove duplicates
      isFavorite: Math.random() > 0.5, // 50% chance to be favorite
    }));
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};
