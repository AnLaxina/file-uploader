import { Link, useNavigate } from "react-router";
import { useState } from "react";

import axiosClient from "../../lib/axiosClient.js";
export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    axiosClient
      .post("/api/sign-up", formValues)
      .then(() => {
        setErrorMessage("");
        setIsSuccessful(true);
        navigate("/");
      })
      .catch((error) => {
        const data = error.response.data;
        setIsSuccessful(false);
        setErrorMessage(data.message);
      });
  }
  return (
    <section>
      <h2>Sign Up</h2>
      <form action="/api/sign-up" method="POST" onSubmit={(e) => onSubmit(e)}>
        {errorMessage !== "" && (
          <h4 className="errorMessage">{errorMessage}</h4>
        )}

        {isSuccessful && (
          <h4 className="successMessage">Registration successful!</h4>
        )}
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
