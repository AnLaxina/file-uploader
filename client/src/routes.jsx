import { createBrowserRouter } from "react-router";
import Home from "./Home";
import HomeContent from "./pages/HomeContent/HomeContent";

const router = new createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        path: "/",
        Component: HomeContent,
      },
    ],
  },
]);

export default router;
