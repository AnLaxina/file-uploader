import styles from "./navbar.module.css";
import axiosClient from "../../lib/axiosClient.js";
import { Link, useNavigate } from "react-router";

export default function NavBar({ loggedIn }) {
  const navigate = useNavigate();
  function logout() {
    axiosClient
      .get("/api/logout")
      .then(() => navigate("/", { replace: true }))
      .catch((error) => console.error(error));
  }
  return (
    <nav>
      <ul className={styles.navBar}>
        {loggedIn ? (
          <>
            <li>
              <Link to="/view-files" className="button">
                View Files
              </Link>
            </li>
            <li>
              <button type="button" onClick={logout} className="button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/sign-up" className="button">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" className="button">
                Log in
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
