import axios from "../../lib/axiosClient.js";
import convertBytes from "../../lib/bytesConversion.js";
import styles from "./infopopup.module.css";
import { format } from "date-fns";
import { useEffect, useState, useContext } from "react";
import { FolderContext } from "../../lib/FolderContext.js";
import { useNavigate } from "react-router";
import { X } from "lucide-react";
import axiosClient from "../../lib/axiosClient.js";

export default function InfoPopup({
  domElement = null,
  fileId,
  currentFiles,
  setFiles,
  isFile = true,
  folderName = "New Folder",
  setFolderName,
  folderId,
  open = false,
  setIsOpen,
}) {
  const [currentFile, setCurrentFile] = useState(null);
  const [renameOn, setRenameOn] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [folders, setFolders] = useContext(FolderContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function retrieveFileData() {
      if (!open) {
        setCurrentFile(null);
        setDownloadUrl(null);
        return;
      }
      try {
        const response = await axios.get(`/api/get-single-file/${fileId}`);
        setCurrentFile(response.data.file);
        setDownloadUrl(response.data.downloadUrl);
      } catch (error) {
        console.error(error);
      }
    }
    retrieveFileData();
  }, [fileId, open]);

  function closePopup() {
    setIsOpen(false);
    domElement.current.close();
  }

  function loadFileData() {
    const formattedDate = format(currentFile.uploadDate, "PPpp");
    return (
      <div className={styles.fileContainer}>
        <p>
          <strong>Name: </strong>
          {currentFile.name}
        </p>
        <p>
          <strong>Size: </strong>
          {convertBytes(currentFile.size)}
        </p>
        <p>
          <strong>Upload Date: </strong>
          {formattedDate}
        </p>
      </div>
    );
  }

  function deleteFile(event) {
    event.preventDefault();
    axios
      .delete(`/api/delete-single-file/${fileId}`)
      .then(() => {
        setFiles(currentFiles.filter((file) => file.id !== fileId));
      })
      .catch((error) => console.error(error));
  }

  function enterFolder() {
    navigate(`/view-folder/${folderName.replaceAll(" ", "-")}/${folderId}`);
  }

  function deleteFolder() {
    axiosClient
      .delete(`/api/delete-single-folder/${folderId}`)
      .then((response) => {
        window.alert(response.data.message);
        setFolders(folders.filter((folder) => folderId !== folder.id));
      })
      .catch((error) => window.alert(error.response.data.message));
  }

  function changeFolderName(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);

    axios
      .patch(`/api/update-single-folder/${folderId}`, formValues)
      .then((response) => {
        setRenameOn(false);
        setFolderName(response.data.folder.name);
      })
      .catch((error) => console.error(error));
  }

  return (
    <dialog ref={domElement} onClose={setIsOpen} className={styles.popupWindow}>
      <div className={styles.popupHeader}>
        <button type="button" onClick={closePopup} className="emptyButton">
          <X size={28} />
        </button>
      </div>
      {isFile && currentFile ? (
        <>
          {loadFileData()}
          <div className={styles.popupButtons}>
            <a href={downloadUrl} target="_blank" download>
              Download File
            </a>
            <a onClick={(e) => deleteFile(e)} href={"delete-file"}>
              Delete File
            </a>
          </div>
        </>
      ) : (
        <>
          {renameOn ? (
            <div className={styles.folderContainer}>
              <h3>Rename Folder</h3>
              <p>To see changes, enter the folder </p>
              <form
                action="/api/update-single-folder"
                method="put"
                onSubmit={(e) => changeFolderName(e)}
              >
                <input
                  type="text"
                  id="newFolderName"
                  name="updatedFolderName"
                  placeholder="max 18 characters"
                  maxLength={18}
                  required
                />
                <div className={styles.popupButtons}>
                  <button
                    type="button"
                    className="button"
                    onClick={() => setRenameOn(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <h3>Folder: {folderName}</h3>
              <div className={styles.popupButtons}>
                <button type="button" className="button" onClick={enterFolder}>
                  Enter
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => setRenameOn(true)}
                >
                  Rename
                </button>
                <button type="button" className="button" onClick={deleteFolder}>
                  Delete
                </button>
              </div>
            </>
          )}
        </>
      )}
    </dialog>
  );
}
