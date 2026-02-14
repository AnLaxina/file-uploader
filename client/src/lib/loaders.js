import axiosClient from "./axiosClient";

export function isLoggedIn() {
  axiosClient
    .get("/api/is-authenticated")
    .then((response) => response.data)
    .catch((error) => error);
}
