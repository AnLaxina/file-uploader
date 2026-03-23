import styles from "./viewfiles.module.css";
import Folder from "../../components/Folder/Folder.jsx";
import axiosClient from "../../lib/axiosClient.js";
import { FolderContext } from "../../lib/FolderContext.js";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { CircleX } from "lucide-react";

export default function ViewFiles() {
  // TODO: Work on adding a form for file creation, but maybe it should be on a different page or popup modal
  const [folders, setFolders] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

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

  function closeDialog() {
    formRef.current.reset();
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
        <div className={styles.viewFilesButtons}>
          <button type="button" className="button" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <button
            type="button"
            className="button"
            command="show-modal"
            commandfor="newFolderDialog"
          >
            Add Folder
          </button>
        </div>

        <dialog id="newFolderDialog">
          <div className={styles.dialogHeader}>
            <button
              type="reset"
              className="emptyButton"
              command="close"
              commandfor="newFolderDialog"
              onClick={closeDialog}
            >
              <CircleX size={30} />
            </button>
          </div>
          <form
            action="/api/post-single-file/:folderId"
            method="POST"
            ref={formRef}
          >
            <h3>New Folder</h3>
            {uploadMessage !== "" &&
              (isValid ? (
                <p className={styles.validMessage}>{uploadMessage}</p>
              ) : (
                <p className={styles.invalidMessage}>{uploadMessage}</p>
              ))}
            <input
              type="text"
              name="folderName"
              id="folderName"
              placeholder="Max. 16 characters"
              maxLength={16}
              required
              autoFocus
            />
            {isUploading ? (
              <button type="submit" className="disabledButton" disabled>
                Uploading...
              </button>
            ) : (
              <button type="submit" className="button">
                Create Folder
              </button>
            )}
          </form>
        </dialog>
      </FolderContext>
    </section>
  );
}
