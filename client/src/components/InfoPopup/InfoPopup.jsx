import axios from "../../lib/axiosClient.js";
import { useEffect, useState } from "react";

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

  function loadFileData() {
    return (
      <div>
        <p>{currentFile.name}</p>
        <p>{currentFile.size}</p>
      </div>
    );
  }

  return (
    <dialog ref={domElement} onClose={setIsOpen}>
      {isFile && currentFile ? <>{loadFileData()}</> : <p>It's a folder</p>}
    </dialog>
  );
}
