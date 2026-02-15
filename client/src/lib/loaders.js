import axiosClient from "./axiosClient";

export async function isLoggedIn() {
  return axiosClient
    .get("/api/is-authenticated")
    .then((response) => response.data)
    .catch((error) => error);
}
