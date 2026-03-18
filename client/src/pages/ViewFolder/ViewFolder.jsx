import styles from "./viewfolder.module.css";
import File from "../../components/File/File.jsx";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import axiosClient from "../../lib/axiosClient";
import { CircleX } from "lucide-react";

export default function ViewFolder() {
  const [files, setFiles] = useState([]);
  const dialogRef = useRef(undefined);
  const formRef = useRef(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { folderName, folderId } = useParams();
  // In Bytes, 24 million bytes is equivalent to 24 MB
  const MAX_FILE_SIZE = 24_000_000;
  // 3,000 ms is 3 seconds
  const DIALOG_CLOSE_DELAY = 3_000;

  useEffect(() => {
    axiosClient.get(`/api/get-all-files/${folderId}`).then((response) => {
      setFiles(response.data.files);
    });
  }, [folderId]);

  function loadFiles() {
    return files.map((file) => (
      <File
        key={file.id}
        fileName={file.name}
        fileId={file.id}
        currentFiles={files}
        setFiles={setFiles}
      />
    ));
  }

  function closeDialog() {
    dialogRef.current.close();
    formRef.current.reset();
    setUploadMessage("");
  }

  function uploadFile(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const file = Object.fromEntries(formData).file;
    setIsUploading(true);

    // First, check the file size before even bothering doing the request
    if (file.size > MAX_FILE_SIZE) {
      setUploadMessage("File must be less than 24 MB!");
      setIsValid(false);
      setIsUploading(false);
      return;
    }

    axiosClient
      .post(`/api/post-single-file/${folderId}`, formData)
      .then(() => {
        setIsValid(true);
        setUploadMessage("File uploaded! Closing window in 3 seconds...");

        axiosClient
          .get(`/api/get-all-files/${folderId}`)
          .then((response) => setFiles(response.data.files));

        // After 3 seconds, close the dialog upon a successful file upload
        setTimeout(closeDialog, DIALOG_CLOSE_DELAY);
      })
      .catch(() => {
        setIsValid(false);
        setUploadMessage("Error uploading file! Please try again.");
      })
      .finally(() => {
        setIsUploading(false);
      });
  }

  return (
    <section className={styles.viewFolderSection}>
      <h2 id={styles.header}>Viewing Folder: {folderName}</h2>

      <div className={styles.files}>
        {files.length === 0 ? (
          <p>No files found! Try adding one!</p>
        ) : (
          loadFiles()
        )}
      </div>

      <button
        type="button"
        className="button"
        command="show-modal"
        commandfor="uploadFileDialog"
      >
        Add File
      </button>

      {/* For this, I'll just add a simple dialog cause yeah I don't think I gotta make this into a component */}
      <dialog
        id="uploadFileDialog"
        onSubmit={(e) => uploadFile(e)}
        ref={dialogRef}
      >
        <div className={styles.dialogHeader}>
          <button type="button" className="emptyButton" onClick={closeDialog}>
            <CircleX size={30} />
          </button>
        </div>
        <form
          action="/api/post-single-file/:folderId"
          method="POST"
          ref={formRef}
        >
          <h3>Upload a File</h3>
          {uploadMessage !== "" &&
            (isValid ? (
              <p className={styles.validMessage}>{uploadMessage}</p>
            ) : (
              <p className={styles.invalidMessage}>{uploadMessage}</p>
            ))}
          <input type="file" name="file" id="file" required autoFocus />
          {isUploading ? (
            <button type="submit" className="disabledButton" disabled>
              Uploading...
            </button>
          ) : (
            <button type="submit" className="button">
              Upload file
            </button>
          )}
        </form>
      </dialog>
    </section>
  );
}
