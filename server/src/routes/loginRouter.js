import { Router } from "express";
import passport from "passport";
import * as loginController from "../controllers/loginController.js";
const loginRoute = Router();

loginRoute.post(
  "/api/login",
  passport.authenticate("local"),
  loginController.login,
);
loginRoute.get(
  "/api/is-authenticated",
  loginController.isLoggedIn,
  (req, res, next) => res.send({ isAuthenticated: true }),
);
export default loginRoute;
