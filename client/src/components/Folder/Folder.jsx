import styles from "./folder.module.css";
import { Folder as FolderIcon } from "lucide-react";

export default function Folder({
  title = "New Folder",
  folderId,
  parentFolderId = null,
}) {
  return (
    <article className={styles.folder}>
      <FolderIcon />
      <h4>{title}</h4>
    </article>
  );
}
