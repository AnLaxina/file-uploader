import axios from "../../lib/axiosClient.js";
import convertBytes from "../../lib/bytesConversion.js";
import styles from "./infopopup.module.css";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function InfoPopup({
  domElement = null,
  open = false,
  setIsOpen,
  isFile = true,
  fileId,
  folderId,
}) {
  // TODO: Work on the popup. Display information to get the delete, download, etc.

  const [currentFile, setCurrentFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [deleteUrl, setDeleteUrl] = useState(null);

  useEffect(() => {
    async function retrieveFileData() {
      if (!open) {
        setCurrentFile(null);
        setDownloadUrl(null);
        setDeleteUrl(null);
        return;
      }
      try {
        const response = await axios.get(`/api/get-single-file/${fileId}`);

        setCurrentFile(response.data.file);
        setDownloadUrl(response.data.downloadUrl);
        setDeleteUrl(response.data.deleteUrl);
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

  return (
    <dialog ref={domElement} onClose={setIsOpen} className={styles.popupWindow}>
      <div className={styles.popupHeader}>
        <button type="button" onClick={closePopup}>
          <X size={28} />
        </button>
      </div>
      {isFile && currentFile ? (
        <>
          {loadFileData()}
          <div className={styles.popupButtons}>
            <a
              className="popupButton"
              href={downloadUrl}
              target="_blank"
              download
            >
              Download File
            </a>
            <a>Delete File</a>
          </div>
        </>
      ) : (
        <p>It's a folder</p>
      )}
    </dialog>
  );
}
