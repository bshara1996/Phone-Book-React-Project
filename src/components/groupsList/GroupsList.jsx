/**
 * GroupsList Component
 *
 * Renders a sidebar containing all contact groups with their counts and color indicators.
 * Provides functionality for adding and deleting groups in admin mode.
 * Each group gets a unique color based on its name for visual distinction.
 */

import { useState } from "react";
import { usePhoneBook } from "../../context/PhoneBookContext";
import AddButton from "../controls/add-button/AddButton";
import Button from "../controls/button/Button";
import Modal from "../modal/Modal";
import GroupForm from "../forms/GroupForm/GroupForm";
import { colors } from "../../app/data/colors";
import classes from "./groupsList.module.css";
import { HiOutlineMinusCircle } from "react-icons/hi";

/**
 * @param {string[]} props.groups - List of available group names
 * @param {string} [props.selectedGroup="all"] - Currently selected group
 * @param {Function} props.onSelectGroup - Handler for group selection
 * @param {boolean} [props.isAdmin=false] - Whether to show admin controls
 * @param {Function} props.onDeleteGroup - Handler for group deletion
 */
export default function GroupsList({
  groups = [],
  selectedGroup = "all",
  onSelectGroup,
  isAdmin = false,
  onDeleteGroup,
}) {
  // Modal state management
  const [state, setState] = useState({
    modal: { isOpen: false, type: null, group: null },
  });

  const { contacts, addGroup } = usePhoneBook();

  /**
   * Opens modal with specified type and group data
   * @param {'add'|'delete'} type - Modal type to open
   * @param {string|null} group - Group data for delete modal
   */
  const handleModal = (type, group = null) =>
    setState({ modal: { isOpen: true, type, group } });

  /**
   * Closes and resets modal state
   */
  const closeModal = () =>
    setState({ modal: { isOpen: false, type: null, group: null } });

  /**
   * Handles form submission for adding/deleting groups
   * @param {string} groupName - Name of group to add/delete
   */
  const handleSubmit = (groupName) => {
    if (state.modal.type === "add") addGroup(groupName);
    if (state.modal.type === "delete") onDeleteGroup(state.modal.group);
    closeModal();
  };

  /**
   * Generates a consistent color for a group based on its name
   * Uses the imported colors array from colors.js
   * @param {string} group - Group name
   * @returns {string} HEX color code
   */
  const getColor = (group) => {
    // "all" group always gets the first color
    if (group === "all") return colors[0];

    // Hash the group name to get a consistent index
    const nameSum = group
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);

    // Use the nameSum to select a color (skipping index 0 which is reserved for "all")
    return colors[1 + (nameSum % (colors.length - 1))];
  };

  /**
   * Renders individual group list item with color indicator and count
   * @param {Object} props - GroupItem props
   * @param {string} props.group - Group name to render
   */
  const GroupItem = ({ group }) => (
    <li
      className={`${classes.groupItem} ${
        selectedGroup === group ? classes.selected : ""
      }`}
      onClick={() => onSelectGroup(group)}
    >
      {/* Color indicator for visual group identification */}
      <div
        className={classes.groupIndicator}
        style={{ backgroundColor: getColor(group) }}
      />
      <span className={classes.groupName}>{group}</span>
      {/* Show contact count for this group */}
      <span className={classes.count}>
        {group === "all"
          ? contacts.length
          : contacts.filter((c) => c.groups.includes(group)).length}
      </span>
      {/* Delete button only shown for admin and non-"all" groups */}
      {isAdmin && group !== "all" && (
        <Button
          className={classes.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            handleModal("delete", group);
          }}
          title={`Delete ${group} group`}
        >
          <HiOutlineMinusCircle className={classes.deleteIcon} />
        </Button>
      )}
    </li>
  );

  return (
    <>
      {/* Admin Controls */}
      {isAdmin && (
        <div className={classes.addButtonContainer}>
          <AddButton onClick={() => handleModal("add")} label="Add Group" />
        </div>
      )}

      {/* Groups List */}
      <div className={classes.groupsContainer}>
        <ul className={classes.groupList}>
          <GroupItem group="all" />
          {groups.map((group) => (
            <GroupItem key={group} group={group} />
          ))}
        </ul>
      </div>

      {/* Modal for Add/Delete operations */}
      {state.modal.isOpen && (
        <Modal
          title={
            state.modal.type === "delete"
              ? "Confirm Delete Group"
              : "Add New Group"
          }
          onClose={closeModal}
        >
          {state.modal.type === "delete" ? (
            <div className={classes.deleteConfirmation}>
              <p>
                Are you sure you want to delete{" "}
                <strong>{state.modal.group}</strong>? This will remove the group
                from all contacts.
              </p>
              <div className={classes.modalButtons}>
                <Button
                  variant="danger"
                  onClick={() => handleSubmit(state.modal.group)}
                >
                  Delete Group
                </Button>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <GroupForm onSubmit={handleSubmit} onCancel={closeModal} />
          )}
        </Modal>
      )}
    </>
  );
}
