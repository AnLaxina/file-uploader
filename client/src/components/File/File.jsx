import { FileText } from "lucide-react";
import { useRef, useState } from "react";
import styles from "./file.module.css";
import InfoPopup from "../InfoPopup/InfoPopup.jsx";

export default function File({ fileId, fileName = "New File", fileKey }) {
  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function openPopup() {
    setIsDialogOpen(true);
    dialogRef.current.showModal();
  }
  return (
    <button type="button" className={styles.emptyButton} onClick={openPopup}>
      <article className={styles.file}>
        <FileText size={48} />
        <h4 id={styles.fileName}>{fileName}</h4>
      </article>

      <InfoPopup
        domElement={dialogRef}
        fileId={fileId}
        open={isDialogOpen}
        setIsOpen={() => setIsDialogOpen(false)}
      />
    </button>
  );
}
