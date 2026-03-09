import styles from "./viewfolder.module.css";
import File from "../../components/File/File.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosClient from "../../lib/axiosClient";

export default function ViewFolder() {
  // TODO: For each file inside a folder, add a click event for viewing details such as download/delete URLs
  const [files, setFiles] = useState([]);
  const { folderName, folderId } = useParams();

  useEffect(() => {
    axiosClient.get(`/api/get-all-files/${folderId}`).then((response) => {
      setFiles(response.data.files);
      console.log(response.data.files);
    });
  }, [folderId]);

  function loadFiles() {
    return files.map((file) => {
      // TODO: Lol create a file component
    });
  }

  return (
    <section className={styles.viewFolderSection}>
      <h2 id={styles.header}>Viewing Folder: {folderName}</h2>

      <div className={styles.files}>
        <File fileName="chicken sauce guy is the best guy in the entire world!" />
        <File fileName="chicken sauce guy is the best guy in the entire world!" />
        <File fileName="chicken sauce guy is the best guy in the entire world!" />
        <File fileName="chicken sauce guy is the best guy in the entire world!" />
        <File fileName="chicken sauce guy is the best guy in the entire world!" />
        <File fileName="chicken sauce guy is the best guy in the entire world!" />
      </div>
    </section>
  );
}
