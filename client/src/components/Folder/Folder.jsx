import InfoPopup from "../InfoPopup/InfoPopup";
import styles from "./folder.module.css";
import { useState, useRef } from "react";
import { CircleX, Folder as FolderIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function Folder({
  title = "New Folder",
  folderId,
  parentFolderId = null,
}) {
  // TODO: Add ability to delete folders and update state accordingly in ViewFiles.jsx
  // * Probably check and see if there are files/folders inside before deleting anything
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState(title);
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  function enterFolder() {
    // Eh just to make it more fancy, replace spaces with dashes
    const newTitle = title.replaceAll(" ", "-");
    console.log(`folderId is: ${folderId}`);
    navigate(`/view-folder/${newTitle}/${folderId}`);
  }

  function deleteFolder() {
    console.log("Delete this folder!");
  }

  function openPopup() {
    setIsOpen(true);
    dialogRef.current.showModal();
  }

  // TODO: Instead of a physical delete button, select a folder instead and show actions to delete it via a modal
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
