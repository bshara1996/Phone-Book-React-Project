import { useState } from "react";
import ContactsList from "../../components/contactsList/ContactsList";
import GroupsList from "../../components/groupsList/GroupsList";
import { usePhoneBook } from "../../context/PhoneBookContext";
import pageClasses from "../page.module.css";
import classes from "./groups.module.css";

/**
 * Groups page component for managing contact groups and viewing filtered contacts
 *
 * @param {Object} user - Current user data for access control
 * @param {string} user.role - User's role ('admin' or 'user')
 * @returns {JSX.Element} A page with group management sidebar and filtered contacts view
 */
export default function Groups({ user }) {
  // Track currently selected group for filtering
  const [selectedGroup, setSelectedGroup] = useState("all");

  // Get group management functions from context
  const { groups, deleteGroup, deleteContactsInGroup } = usePhoneBook();

  // Determine if user has admin privileges
  const isAdmin = user?.role === "admin";

  /**
   * Handles group deletion by removing both the group and its contacts
   * @param {string} group - The name of the group to delete
   */
  const handleDeleteGroup = (group) => {
    deleteContactsInGroup(group);
    deleteGroup(group);
  };

  return (
    <div className={pageClasses.page}>
      <main>
        <div className={classes.header}>
          <h2 className={classes.title}>Contact Groups</h2>
        </div>
        <div className={classes.container}>
          <div className={classes.sidebar}>
            <GroupsList
              groups={groups}
              selectedGroup={selectedGroup}
              onSelectGroup={setSelectedGroup}
              isAdmin={isAdmin}
              onDeleteGroup={handleDeleteGroup}
            />
          </div>
          <div className={classes.content}>
            <ContactsList
              isAdmin={isAdmin}
              group={selectedGroup !== "all" ? selectedGroup : undefined}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
