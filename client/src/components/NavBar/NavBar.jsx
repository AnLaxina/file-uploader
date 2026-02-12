import styles from "./navbar.module.css";
import { Link } from "react-router";

export default function NavBar() {
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
      </ul>
    </nav>
  );
}
