import { useState } from "react";
import { usePhoneBook } from "../../../context/PhoneBookContext";
import Button from "../../controls/button/Button";
import classes from "./contactForm.module.css";

/**
 * ContactForm Component
 *
 * A form component for creating and editing contact information in the phone book.
 * Handles contact details including name, phone, email, image URL, and group assignments.
 *
 * @param {Object} props
 * @param {Object} [props.contact] - Existing contact data for editing mode. Undefined for new contact.
 * @param {Function} props.onSubmit - Callback function called with form data when submitted
 * @param {Function} props.onCancel - Callback function for handling form cancellation
 */
export default function ContactForm({ contact, onSubmit, onCancel }) {
  // Access groups from the PhoneBook context
  const { groups } = usePhoneBook();

  // Initialize form state with existing contact data or empty values
  const [formData, setFormData] = useState({
    name: contact?.name || "",
    phone: contact?.phone || "",
    email: contact?.email || "",
    image: contact?.image || "",
    groups: contact?.groups || [],
  });

  /**
   * Handles input changes for text fields
   * @param {Object} event - The input change event
   */
  const handleInput = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Toggles group selection in the form
   * @param {string} group - The group name to toggle
   */
  const handleGroupToggle = (group) => {
    setFormData((prev) => ({
      ...prev,
      groups: prev.groups.includes(group)
        ? prev.groups.filter((g) => g !== group)
        : [...prev.groups, group],
    }));
  };

  /**
   * Handles form submission
   * Sets default avatar if no image URL is provided
   * @param {Object} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      image: formData.image || "https://i.pravatar.cc/200?img=1",
    });
  };

  // Configuration for form fields with their properties
  const fields = [
    { id: "name", type: "text", label: "Name", required: true },
    { id: "phone", type: "tel", label: "Phone", required: true },
    { id: "email", type: "email", label: "Email", required: true },
    {
      id: "image",
      type: "text",
      label: "Image URL",
      placeholder: "https://i.pravatar.cc/200?img=1",
      required: false,
    },
  ];

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {/* Map through configured fields to render input groups */}
      {fields.map(({ id, type, label, placeholder, required }) => (
        <div key={id} className={classes.inputGroup}>
          <label htmlFor={id} className={classes.label}>
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={id}
            className={classes.input}
            value={formData[id]}
            onChange={handleInput}
            placeholder={placeholder}
            required={required}
          />

          {/* if id of the input == image Show helper text and image preview */}
          {id === "image" && (
            <>
              <p className={classes.helper}>
                Leave empty to use a random avatar from pravatar.cc
              </p>
              {formData.image && (
                <div className={classes.imagePreview}>
                  <img src={formData.image} alt="Preview" />
                </div>
              )}
            </>
          )}
        </div>
      ))}

      {/* Groups selection section */}
      <div className={classes.inputGroup}>
        <label className={classes.label}>Groups</label>
        <div className={classes.helper}>Please select at least one group</div>
        <div className={classes.groupsContainer}>
          {groups.map((group) => (
            <div key={group} className={classes.groupCheckbox}>
              <input
                type="checkbox"
                id={`group-${group}`}
                checked={formData.groups.includes(group)}
                onChange={() => handleGroupToggle(group)}
                required={formData.groups.length === 0}
              />
              <label htmlFor={`group-${group}`}>{group}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className={classes.buttonGroup}>
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit">{contact ? "Update" : "Add"} Contact</Button>
      </div>
    </form>
  );
}
