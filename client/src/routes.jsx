import { createBrowserRouter } from "react-router";
import Home from "./Home";
import HomeContent from "./pages/HomeContent/HomeContent";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ViewFiles from "./pages/ViewFiles/ViewFiles";
import { isLoggedIn, checkPage } from "./lib/loaders.js";
import ViewFolder from "./pages/ViewFolder/ViewFolder.jsx";

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
      {
        path: "/view-folder/:folderName/:folderId",
        Component: ViewFolder,
        loader: checkPage,
      },
    ],
  },
]);

export default router;
