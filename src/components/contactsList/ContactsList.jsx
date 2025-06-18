import { useState } from "react";
import { usePhoneBook } from "../../context/PhoneBookContext";

import ContactCard from "../cards/contactCard/ContactCard";
import Search from "../controls/search/Search";
import SortButton from "../controls/sort-button/SortButton";
import ViewToggleButton from "../controls/view-toggle-button/ViewToggleButton";
import AddButton from "../controls/add-button/AddButton";
import Button from "../controls/button/Button";
import Modal from "../modal/Modal";
import ContactForm from "../forms/ContactForm/ContactForm";

import classes from "./contactsList.module.css";

/**
 * Main contacts list with filtering, sorting, and CRUD operations
 * @param {boolean} isAdmin - Enables admin controls (add, edit, delete)
 * @param {string} [group] - Filter contacts by group name
 * @returns {JSX.Element} List of contacts with control panel
 */
export default function ContactsList({ isAdmin, group }) {
  const {
    contacts,
    favoriteContacts,
    viewMode,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    setViewMode,
    filteredContacts,
  } = usePhoneBook();
  /**
   * Combined state management using a single state object for better organization
   * - searchTerm: Current search filter text
   * - sortConfig: Current sorting configuration (field and direction)
   * - showFavorites: Toggle for displaying only favorite contacts
   * - modal: Modal state including type (add/edit/delete) and associated data
   */
  const [state, setState] = useState({
    searchTerm: "",
    sortConfig: { key: "name", direction: "asc" },
    showFavorites: false,
    modal: { isOpen: false, type: null, data: null },
  });

  const { searchTerm, sortConfig, showFavorites, modal } = state;

  /**
   * Contact filtering and sorting logic
   * 1. First filters contacts based on search term and group
   * 2. If showing favorites, filters further to show only favorite contacts
   * 3. Otherwise, sorts the filtered contacts based on current sort configuration
   */
  const filtered = filteredContacts(group, searchTerm);
  // Get base filtered contacts
  const displayedContacts = (() => {
    // First, get the base filtered list
    const baseList = showFavorites
      ? favoriteContacts(group, searchTerm)
      : filtered;

    // Then apply sorting
    return [...baseList].sort((a, b) => {
      const aVal = a[sortConfig.key].toLowerCase();
      const bVal = b[sortConfig.key].toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  })();

  /**
   * Handles sorting when a sort button is clicked
   * - If clicking same field, toggles direction
   * - If clicking new field, sorts ascending by that field
   * @param {string} key - The field to sort by (name/email/phone)
   */
  const handleSort = (key) =>
    setState((s) => ({
      ...s,
      sortConfig: {
        key,
        direction:
          s.sortConfig.key === key && s.sortConfig.direction === "asc"
            ? "desc"
            : "asc",
      },
    }));
  /**
   * Opens a modal dialog with specified type and data
   * @param {'add'|'edit'|'delete'} type - The type of modal to open
   * @param {Object|null} data - Data to be used in the modal (contact for edit/delete)
   */
  const handleModal = (type, data = null) =>
    setState((s) => ({
      ...s,
      modal: { isOpen: true, type, data },
    }));

  /**
   * Closes the current modal and resets its state
   */
  const closeModal = () =>
    setState((s) => ({
      ...s,
      modal: { isOpen: false, type: null, data: null },
    }));
  /**
   * Handles form submission for both new and existing contacts
   * - For existing contacts: Updates the contact with new data
   * - For new contacts: Creates a new contact with:
   *   - Random groups if none selected
   *   - Random avatar if no image provided
   *   - 30% chance to be marked as favorite
   * @param {Object} formData - The form data from ContactForm
   */
  const handleSubmit = (formData) => {
    if (modal.data) {
      updateContact(modal.data.id, formData);
    } else {
      const randomGroups =
        formData.groups.length === 0
          ? [
              groups[Math.floor(Math.random() * groups.length)],
              groups[Math.floor(Math.random() * groups.length)],
            ].filter((g, i, self) => self.indexOf(g) === i)
          : formData.groups;

      addContact({
        ...formData,
        id: crypto.randomUUID(),
        groups: randomGroups,
        image:
          formData.image ||
          `https://i.pravatar.cc/200?img=${Math.floor(Math.random() * 70) + 1}`,
        isFavorite: Math.random() > 0.7,
      });
    }
    closeModal();
  };
  /**
   * Handles contact deletion
   * - Supports deleting a single contact or multiple contacts
   * - For multiple deletion, removes all currently displayed contacts
   * - Closes modal after successful deletion
   */
  const handleDelete = () => {
    if (modal.type === "delete") {
      if (modal.data.isMultiple) {
        displayedContacts.forEach((contact) => deleteContact(contact.id));
      } else {
        deleteContact(modal.data.id);
      }
      closeModal();
    }
  };
  /**
   * Renders the contact list component with all its controls and content
   * Layout sections:
   * 1. Admin controls (conditional)
   * 2. Search and filter controls
   * 3. Contact list/grid
   * 4. Modal dialogs
   */
  return (
    <div className={classes.container}>
      {/* Admin Controls Section - Only visible for admin users */}
      {isAdmin && (
        <div className={classes.adminControls}>
          <AddButton onClick={() => handleModal("add")} label="Add New" />
          <Button
            variant="danger"
            onClick={() => handleModal("delete", { isMultiple: true })}
            title="Delete all visible contacts"
          >
            Delete All
          </Button>
        </div>
      )}
      {/* Search and Sort Controls Section */}
      <div className={classes.controls}>
        <div className={classes.controlsRow}>
          <div className={classes.searchContainer}>
            <Search
              value={searchTerm}
              onChange={(term) => setState((s) => ({ ...s, searchTerm: term }))}
            />
          </div>

          {/* Sort Controls - Name, Email, Phone */}
          <div className={classes.sortButtons}>
            {["name", "email", "phone"].map((key) => (
              <SortButton
                key={key}
                currentKey={sortConfig.key}
                sortKey={key}
                direction={sortConfig.direction}
                onSort={handleSort}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
          </div>
          <div className={classes.verticalDivider} />
          <div className={classes.rightControls}>
            <ViewToggleButton view={viewMode} onToggle={setViewMode} />
            <Button
              variant={showFavorites ? "primary" : "secondary"}
              onClick={() =>
                setState((s) => ({ ...s, showFavorites: !s.showFavorites }))
              }
            >
              {showFavorites ? "Hide Favorites" : "Show Favorites"}
            </Button>
          </div>
        </div>
      </div>

      {/* Contact List Section - Shows empty state or contact cards */}
      {displayedContacts.length === 0 ? (
        <div className={classes.emptyState}>
          <h3>No Contacts Found</h3>
          <p>Try adjusting your search terms</p>
        </div>
      ) : (
        <div className={classes.list}>
          {/* Render each contact as a card with actions based on view mode and admin status */}
          {displayedContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              viewMode={viewMode}
              isAdmin={isAdmin}
              onEdit={() => handleModal("edit", contact)}
              onDelete={() => handleModal("delete", contact)}
              onToggleFavorite={() => toggleFavorite(contact.id)}
            />
          ))}
        </div>
      )}
      {/* Modal Section - Handles Add/Edit/Delete operations */}
      {modal.isOpen && (
        <Modal
          title={
            modal.type === "delete"
              ? "Confirm Delete"
              : modal.type === "edit"
              ? "Edit Contact"
              : "Add Contact"
          }
          onClose={closeModal}
        >
          {modal.type === "delete" ? (
            <div className={classes.deleteConfirmation}>
              <p>
                Are you sure you want to delete
                {modal.data.isMultiple
                  ? " all visible contacts"
                  : ` ${modal.data.name}`}
                ?
              </p>
              <div className={classes.modalButtons}>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <ContactForm
              contact={modal.data}
              onSubmit={handleSubmit}
              onCancel={closeModal}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
