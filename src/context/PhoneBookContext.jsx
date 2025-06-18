/**
 * PhoneBookContext manages the global state for the phone book application.
 * It provides functionality for:
 * - Managing contacts (add, update, delete, favorite)
 * - Managing groups (add, delete)
 * - Filtering and searching contacts
 * - Handling view modes and loading states
 *
 * The context is created empty and will be populated with data and functions
 * by the PhoneBookProvider component.
 */
import { createContext, useContext, useState } from "react";
import { fetchRandomContacts } from "../utils/api";

/**
 * Create an empty context that will hold and manage phone book state and methods.
 * This context will be consumed by components using the usePhoneBook hook.
 */
const PhoneBookContext = createContext();

// PhoneBookProvider component that wraps the application and provides phone book functionality
export const PhoneBookProvider = ({ children }) => {
  // State declarations

  // contacts: Array of contact objects containing personal information
  const [contacts, setContacts] = useState([]);

  // groups: Predefined categories for organizing contacts
  const [groups, setGroups] = useState(["Family", "Friends", "Work"]);
  // Tracks if contacts are currently being loaded from the API
  const [isLoading, setIsLoading] = useState(false);

  // selectedGroup: Currently selected group for filtering contacts
  const [selectedGroup, setSelectedGroup] = useState(null);

  // viewMode: Display mode for contacts list ("full" or compact view)
  const [viewMode, setViewMode] = useState("full");

  // Function to reset all states and fetch fresh data
  const resetAllData = async () => {
    setIsLoading(true);
    try {
      // Reset all states to their initial values
      setContacts([]);
      setGroups(["Family", "Friends", "Work"]);
      setSelectedGroup(null);
      setViewMode("full");

      // Fetch fresh data
      const fetchedContacts = await fetchRandomContacts(10, groups);
      setContacts(fetchedContacts);
    } catch (error) {
      console.error("Error resetting and loading contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter contacts based on group membership and search term
  const filteredContacts = (group, searchTerm = "") => {
    return contacts.filter((contact) => {
      // Check if contact matches search term in name, email, or phone
      const matchesSearch =
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm);

      // Check if contact belongs to selected group (if any)
      const matchesGroup = group ? contact.groups.includes(group) : true;

      return matchesSearch && matchesGroup;
    });
  };

  // Get contacts marked as favorites, filtered by group and search term
  const favoriteContacts = (group, searchTerm = "") => {
    return filteredContacts(group, searchTerm).filter(
      (contact) => contact.isFavorite
    );
  };

  // Contact management operations
  // Add a new contact with a generated UUID
  const addContact = (newContact) => {
    setContacts((prev) => [
      ...prev,
      { ...newContact, id: crypto.randomUUID() },
    ]);
  };

  // Update an existing contact's information
  const updateContact = (id, updatedContact) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  // Delete a single contact by ID
  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  // Delete contacts in a group - O(n) with single pass through array
  const deleteContactsInGroup = (group) => {
    if (!group) return; // Guard clause for invalid group
    setContacts((prev) =>
      prev.filter((contact) => !contact.groups.includes(group))
    );
  };

  // Toggle a contact's favorite status
  const toggleFavorite = (id) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
  };

  // Group management operations
  // Add a new group if it doesn't already exist
  const addGroup = (newGroup) => {
    if (!groups.includes(newGroup)) {
      setGroups((prev) => [...prev, newGroup]);
    }
  };

  // Remove a group
  const deleteGroup = (group) => {
    setGroups((prev) => prev.filter((g) => g !== group));
  };

  // Context value object containing all state and functions
  const value = {
    contacts,
    favoriteContacts,
    groups,
    isLoading,
    viewMode,
    selectedGroup,
    setSelectedGroup,
    addContact,
    updateContact,
    deleteContact,
    deleteContactsInGroup,
    toggleFavorite,
    addGroup,
    deleteGroup,
    setViewMode,
    filteredContacts,
    resetAllData,
  };

  // Provide the context value to all child components
  return (
    <PhoneBookContext.Provider value={value}>
      {children}
    </PhoneBookContext.Provider>
  );
};

// Custom hook for accessing the phone book context
// Throws an error if used outside of PhoneBookProvider
export const usePhoneBook = () => {
  const context = useContext(PhoneBookContext);
  if (!context) {
    throw new Error("usePhoneBook must be used within a PhoneBookProvider");
  }
  return context;
};
