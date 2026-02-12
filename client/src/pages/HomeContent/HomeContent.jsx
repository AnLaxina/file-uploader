import styles from "./homecontent.module.css";
import NavBar from "../../components/NavBar/NavBar.jsx";

export default function HomeContent() {
  return (
    <section className={styles.homeContentSection}>
      <div className={styles.instructions}>
        <h3>Instructions</h3>
        <p>
          Welcome to the File Uploader! You can create an account and store
          files on the cloud!
        </p>
      </div>
      <NavBar />
    </section>
  );
}
