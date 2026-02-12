import { Router } from "express";
import * as signUpController from "../controllers/signupController.js";

const signupRoute = Router();

signupRoute.post("/api/sign-up", signUpController.registerUser);

export default signupRoute;
