import styles from "./homecontent.module.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { useLoaderData } from "react-router";

export default function HomeContent() {
  const { isAuthenticated, user } = useLoaderData();
  return (
    <section className={styles.homeContentSection}>
      {user && <h2>Welcome back {user.email}!</h2>}
      <div className={styles.instructions}>
        <h3>Instructions</h3>
        <p>
          Welcome to the File Uploader! You can create an account and store
          files on the cloud!
        </p>
      </div>
      <NavBar isLoggedIn={isAuthenticated} />
    </section>
  );
}
