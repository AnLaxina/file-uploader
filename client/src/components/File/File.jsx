import { FileText } from "lucide-react";
import styles from "./file.module.css";

export default function File({ fileId, fileName = "New File", fileKey }) {
  return (
    <button type="button" className={styles.emptyButton}>
      <article className={styles.file}>
        <FileText size={48} />
        <h4 id={styles.fileName}>{fileName}</h4>
      </article>
    </button>
  );
}
