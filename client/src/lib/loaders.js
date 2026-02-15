import axiosClient from "./axiosClient";
import { redirect } from "react-router";
export async function isLoggedIn() {
  return axiosClient
    .get("/api/is-authenticated")
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
}

// * This is for protected pages
export async function checkPage() {
  return axiosClient
    .get("/api/is-authenticated")
    .then((response) => response.data)
    .catch(() => {
      throw redirect("/");
    });
}
