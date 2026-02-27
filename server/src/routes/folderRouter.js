import { isLoggedIn } from "../controllers/loginController.js";
import * as folderController from "../controllers/folderController.js";
import {Router} from "express";

const folderRoute = Router();

folderRoute.post("/api/post-single-folder", isLoggedIn, folderController.addSingleFolder);


export default folderRoute;