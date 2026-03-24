import InfoPopup from "../InfoPopup/InfoPopup";
import styles from "./folder.module.css";
import { useState, useRef } from "react";
import { Folder as FolderIcon } from "lucide-react";

export default function Folder({
  title = "New Folder",
  folderId,
  parentFolderId = null,
}) {
  // * Probably check and see if there are files/folders inside before deleting anything
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState(title);
  const dialogRef = useRef(null);

  function openPopup() {
    setIsOpen(true);
    dialogRef.current.showModal();
  }

  return (
    <>
      <button className={styles.folder} onClick={openPopup} type="button">
        <FolderIcon size={48} />
        <h4>{title}</h4>
      </button>

      <InfoPopup
        domElement={dialogRef}
        isFile={false}
        folderName={folderName}
        setFolderName={setFolderName}
        folderId={folderId}
        setIsOpen={() => setIsOpen(false)}
      />
    </>
  );
}
