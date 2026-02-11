import { createBrowserRouter } from "react-router";
import Home from "./Home";

const router = new createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [{}],
  },
]);

export default router;
