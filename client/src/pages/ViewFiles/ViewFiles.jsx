import styles from "./viewfiles.module.css";
import Folder from "../../components/Folder/Folder.jsx";
import axiosClient from "../../lib/axiosClient.js";
import { FolderContext } from "../../lib/FolderContext.js";
import { useState, useEffect } from "react";

export default function ViewFiles() {
  // TODO: Work on adding a form for file creation, but maybe it should be on a different page or popup modal
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    axiosClient.get("/api/get-all-folders").then((response) => {
      const folders = response.data.folders;
      setFolders(folders);
    });
  }, []);

  function loadFolders() {
    return folders.map((folder) => (
      <Folder
        key={folder.id}
        title={folder.name}
        folderId={folder.id}
        parentFolderId={folder.parentFolderId}
      />
    ));
  }

  return (
    <section className={styles.viewFilesSection}>
      <FolderContext value={[folders, setFolders]}>
        <h2>Your Folders</h2>
        <div className={styles.folders}>
          {folders.length === 0 ? (
            <p>No folders! Create one!</p>
          ) : (
            loadFolders()
          )}
        </div>
      </FolderContext>
    </section>
  );
}
