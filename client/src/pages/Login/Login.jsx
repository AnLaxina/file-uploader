import { Link, useNavigate } from "react-router";
import { useState } from "react";
import axiosClient from "../../lib/axiosClient.js";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    axiosClient
      .post("/api/login", formValues)
      .then(() => {
        setErrorMessage("");
        navigate("/");
      })
      .catch(() => setErrorMessage("Invalid email or password!"));
  }
  return (
    <section>
      <h2>Login</h2>
      <form action="/api/login" method="get" onSubmit={onSubmit}>
        {errorMessage !== "" && (
          <h4 className="errorMessage">{errorMessage}</h4>
        )}
        <input
          type="email"
          name="username"
          id="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />

        <div className="formSubmission">
          <Link to="/" className="button">
            Back
          </Link>
          <button type="submit" className="button">
            Login
          </button>
        </div>
      </form>
    </section>
  );
}
