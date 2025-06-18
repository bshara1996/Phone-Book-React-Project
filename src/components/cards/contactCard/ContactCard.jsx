import { HiPhone, HiMail, HiPencil, HiTrash } from "react-icons/hi";
import FavoriteButton from "../../controls/favorite-button/FavoriteButton";
import classes from "./ContactCard.module.css";

/**
 * ContactCard component displays contact information in either full or compact view
 * Provides admin actions and favorite toggling functionality
 *
 * @param {Object} props.contact - Contact data with id, name, phone, etc.
 * @param {string} props.viewMode - Display mode ('full' or 'compact')
 * @param {boolean} props.isAdmin - Whether current user has admin privileges
 * @param {Function} props.onEdit - Callback for editing contact
 * @param {Function} props.onDelete - Callback for deleting contact
 * @param {Function} props.onToggleFavorite - Callback for toggling favorite status
 */
export default function ContactCard({
  contact: { id, name, phone, email, image, groups = [], isFavorite },
  viewMode = "full",
  isAdmin,
  onEdit,
  onDelete,
  onToggleFavorite,
}) {
  /**
   * Renders action buttons (favorite, edit, delete)
   * Edit and delete buttons are only visible to admin users
   */
  const Actions = () => (
    <div className={classes.actions}>
      {/* Favorite toggle button shown to all users */}
      <FavoriteButton
        isFavorite={isFavorite}
        onClick={() => onToggleFavorite(id)}
      />
      {/* Admin-only action buttons */}
      {isAdmin && (
        <>
          <button
            className={`${classes.actionButton} ${classes.editButton}`}
            onClick={() =>
              onEdit({ id, name, phone, email, image, groups, isFavorite })
            }
            aria-label="Edit contact"
          >
            <HiPencil />
          </button>
          <button
            className={`${classes.actionButton} ${classes.deleteButton}`}
            onClick={() => onDelete(id)}
            aria-label="Delete contact"
          >
            <HiTrash />
          </button>
        </>
      )}
    </div>
  );

  /**
   * Renders contact information including name, phone, email, and groups
   * @param {boolean} showFullInfo - Whether to show complete contact info
   */
  const ContactInfo = ({ showFullInfo }) => (
    <div className={classes.info}>
      <h3 className={classes.name}>{name}</h3>
      <div className={classes.contactInfo}>
        {/* Only show phone, email, groups in full view */}
        {showFullInfo && (
          <>
            <div className={classes.contactItem}>
              <HiPhone className={classes.icon} />
              <span>{phone}</span>
            </div>
            <div className={classes.contactItem}>
              <HiMail className={classes.icon} />
              <span>{email}</span>
            </div>
            <div className={classes.groups}>
              {groups.map((group) => (
                <span key={group} className={classes.group}>
                  {group}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
  /**
   * Shared card layout component that adapts to both view modes
   */
  const isCompact = viewMode === "compact";

  return (
    <div
      className={`${classes.card} ${
        isCompact ? classes.compactView : classes.fullView
      }`}
      data-testid={`contact-card-${id}`}
    >
      <div className={classes.cardContent}>
        {/* Left section: Image and basic info */}
        <div className={classes.leftSection}>
          <div className={classes.imageContainer}>
            <img src={image} alt={name} />
          </div>
          <ContactInfo showFullInfo={!isCompact} />
        </div>

        {/* Right section: Actions */}
        <div className={classes.rightSection}>
          <Actions />
        </div>
      </div>
    </div>
  );
}
