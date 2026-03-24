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
        {isAuthenticated ? (
          <div>
            <p>
              View your folders and add one with the Add Folder button below!
            </p>
            <br />
            <p>
              To upload files, enter a folder that's already created and click
              the Add Button at the bottom.
            </p>
            <br />
          </div>
        ) : (
          <p>
            Welcome to the File Uploader! You can create an account and store
            files on the cloud!
          </p>
        )}

        <ul>
          <li>
            <p>
              <strong>Note:</strong> Each file can only be 24 MB.
            </p>
          </li>
          <li>
            <p>
              <strong>Note:</strong> Folders can only be deleted once all files
              in that folder are deleted as well.
            </p>
          </li>
        </ul>
      </div>
      <NavBar loggedIn={isAuthenticated} />
    </section>
  );
}
