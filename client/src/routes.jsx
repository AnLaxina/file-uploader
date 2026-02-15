import { createBrowserRouter } from "react-router";
import Home from "./Home";
import HomeContent from "./pages/HomeContent/HomeContent";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ViewFiles from "./pages/ViewFiles/ViewFiles";
import { isLoggedIn, checkPage } from "./lib/loaders.js";

const router = new createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        index: true,
        Component: HomeContent,
        loader: isLoggedIn,
      },
      {
        path: "/sign-up",
        Component: SignUp,
      },
      {
        path: "/login",
        Component: Login,
      },
      { path: "/view-files", Component: ViewFiles, loader: checkPage },
    ],
  },
]);

export default router;
