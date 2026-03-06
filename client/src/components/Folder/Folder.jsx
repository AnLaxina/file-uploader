import styles from "./folder.module.css";
import { CircleX, Folder as FolderIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function Folder({
  title = "New Folder",
  folderId,
  parentFolderId = null,
}) {
  // TODO: Add ability to delete folders and update state accordingly in ViewFiles.jsx
  // * Probably check and see if there are files/folders inside before deleting anything
  const navigate = useNavigate();

  function enterFolder() {
    // Eh just to make it more fancy, replace spaces with dashes
    const newTitle = title.replaceAll(" ", "-");
    navigate(`/view-folder/${newTitle}/${folderId}`);
  }
  return (
    <article className={styles.folder} onClick={enterFolder}>
      <div className={styles.folderHeader}>
        <button type="button">
          <CircleX />
        </button>
      </div>
      <div className={styles.folderBottom}>
        <FolderIcon />
        <h4>{title}</h4>
      </div>
    </article>
  );
}
