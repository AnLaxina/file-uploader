import styles from "./viewfiles.module.css";
import Folder from "../../components/Folder/Folder.jsx";

export default function ViewFiles() {
  // TODO: Make each Folder component look nice on mobile. Make the folders a grid.
  // TODO: Work on adding a form for file creation, but maybe it should be on a different page or popup modal
  return (
    <section className={styles.viewFilesSection}>
      <aside>
        <p>chicken</p>
      </aside>
      <section>
        <h2>Your Files</h2>
        <div className={styles.folders}>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
        </div>
      </section>
    </section>
  );
}
