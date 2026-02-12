import { Link } from "react-router";

export default function SignUp() {
  return (
    <section>
      <h2>Sign Up</h2>
      <form action="/api/sign-up" method="POST">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />

        <div className="formSubmission">
          <Link to="/" className="button">
            Back
          </Link>
          <button type="submit" className="button">
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
}
