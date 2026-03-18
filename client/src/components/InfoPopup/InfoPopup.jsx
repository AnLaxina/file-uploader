import axios from "../../lib/axiosClient.js";
import convertBytes from "../../lib/bytesConversion.js";
import styles from "./infopopup.module.css";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function InfoPopup({
  domElement = null,
  fileId,
  currentFiles,
  setFiles,
  isFile = true,
  folderId,
  open = false,
  setIsOpen,
}) {
  const [currentFile, setCurrentFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

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
      .then((data) => {
        console.log(data.response);
        setFiles(currentFiles.filter((file) => file.id !== fileId));
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
        <p>It's a folder</p>
      )}
    </dialog>
  );
}
