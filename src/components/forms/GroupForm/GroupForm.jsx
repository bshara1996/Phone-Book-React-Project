import { useState } from "react";
import Button from "../../controls/button/Button";
import classes from "./groupForm.module.css";

/**
 * Group Form Component for adding new groups to the phone book
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Called with group name on successful submission
 * @param {Function} props.onCancel - Called when cancel button is clicked
 * @returns {JSX.Element} A form with group name input and validation
 */
export default function GroupForm({ onSubmit, onCancel }) {
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");

  /**
   * Handles form submission and validates group name
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError("Group name is required");
      return;
    }
    onSubmit(groupName.trim());
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.inputGroup}>
        <label htmlFor="groupName" className={classes.label}>
          Group Name
        </label>
        <input
          type="text"
          id="groupName"
          className={classes.input}
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
            setError("");
          }}
          placeholder="Enter group name"
        />
        {error && <p className={classes.error}>{error}</p>}
      </div>
      <div className={classes.buttonGroup}>
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit">Add Group</Button>
      </div>
    </form>
  );
}
