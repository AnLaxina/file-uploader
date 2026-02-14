import { createBrowserRouter } from "react-router";
import Home from "./Home";
import HomeContent from "./pages/HomeContent/HomeContent";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";

const router = new createBrowserRouter([
  {
    path: "/",
    Component: Home,
    loader: (e) => {
      console.log(e);
    },
    children: [
      {
        path: "/",
        Component: HomeContent,
      },
      {
        path: "/sign-up",
        Component: SignUp,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);

export default router;
