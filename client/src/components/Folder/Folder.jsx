import styles from "./folder.module.css";
import { CircleX, Folder as FolderIcon } from "lucide-react";

export default function Folder({
  title = "New Folder",
  folderId,
  parentFolderId = null,
}) {
  return (
    <article className={styles.folder}>
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
