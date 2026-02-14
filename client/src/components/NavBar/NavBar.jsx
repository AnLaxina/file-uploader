import styles from "./navbar.module.css";
import axiosClient from "../../lib/axiosClient.js";
import { Link } from "react-router";

export default function NavBar({ isLoggedIn }) {
  function logout() {
    axiosClient
      .get("/api/logout")
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  }
  return (
    <nav>
      <ul className={styles.navBar}>
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
        {isLoggedIn && (
          <li>
            <button type="button" onClick={logout} className="button">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
