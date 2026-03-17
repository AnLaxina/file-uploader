import styles from "./viewfolder.module.css";
import File from "../../components/File/File.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosClient from "../../lib/axiosClient";
import { CircleX } from "lucide-react";

export default function ViewFolder() {
  // TODO: Add the ability to add/upload files
  // But first, style the popup for this part. Right now it looks fine but you gotta add a file size limit of some kind
  const [files, setFiles] = useState([]);
  const { folderName, folderId } = useParams();

  useEffect(() => {
    axiosClient.get(`/api/get-all-files/${folderId}`).then((response) => {
      setFiles(response.data.files);
      console.log(response.data.files);
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

  function uploadFile(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const file = Object.fromEntries(formData).uploadedFile;
    console.log(file);
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
      <dialog id="uploadFileDialog" onSubmit={(e) => uploadFile(e)}>
        <div className={styles.dialogHeader}>
          <button
            type="button"
            className="emptyButton"
            command="close"
            commandfor="uploadFileDialog"
          >
            <CircleX size={30} />
          </button>
        </div>
        <form action="/api/post-single-file/:folderId" method="POST">
          <h3>Upload a File</h3>
          <input
            type="file"
            name="uploadedFile"
            id="uploadedFile"
            required
            autoFocus
          />
          <button type="submit" className="button">
            Upload file
          </button>
        </form>
      </dialog>
    </section>
  );
}
