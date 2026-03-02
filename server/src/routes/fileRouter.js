import Router from "express";
import multer from "multer";
import * as fileController from "../controllers/fileController.js";
import { isLoggedIn } from "../controllers/loginController.js";

// * No options in multer means it'll just upload to memory
const uploads = multer();

const fileRoute = Router();
fileRoute.post(
  "/api/post-single-file",
  isLoggedIn,
  uploads.single("file"),
  fileController.addSingleFile,
);

export default fileRoute;
